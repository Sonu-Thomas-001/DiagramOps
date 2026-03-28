import json
from collections import defaultdict, deque
from typing import Dict, List, Any

def assign_group(label: str, node_id: str) -> str:
    """
    Assigns a logical group to a node based on keyword heuristics.
    Groups: frontend, backend, database, infrastructure
    """
    text_to_check = f"{label} {node_id}".lower()
    
    # Heuristics for grouping
    if any(kw in text_to_check for kw in ['user', 'client', 'browser', 'web', 'ui', 'frontend', 'mobile', 'app']):
        return 'frontend'
    elif any(kw in text_to_check for kw in ['db', 'database', 'sql', 'redis', 'cache', 'storage', 's3', 'mongo', 'postgres']):
        return 'database'
    elif any(kw in text_to_check for kw in ['api', 'gateway', 'service', 'auth', 'backend', 'server', 'worker', 'lambda', 'compute']):
        return 'backend'
    
    return 'infrastructure'

def build_diagram_layout(diagram_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Takes structured nodes and edges and enriches them with layout hints:
    - levels (top -> bottom hierarchy)
    - groups (frontend, backend, database)
    """
    nodes = diagram_data.get("nodes", [])
    edges = diagram_data.get("edges", [])
    
    if not nodes:
        return diagram_data

    # 1. Build Adjacency List and In-Degree map
    adj = defaultdict(list)
    in_degree = defaultdict(int)
    nodes_dict = {n["id"]: n for n in nodes}
    
    # Initialize in-degree for all nodes to 0
    for node in nodes:
        in_degree[node["id"]] = 0
        
    for edge in edges:
        source = edge["from"]
        target = edge["to"]
        adj[source].append(target)
        in_degree[target] += 1

    # 2. Identify Root Nodes (Level 0)
    # Roots are nodes with no incoming edges (e.g., Users, external clients)
    roots = [nid for nid, deg in in_degree.items() if deg == 0]
    
    # Fallback: If there are cycles and no roots, pick the node with the highest out-degree
    if not roots:
        out_degree = {nid: len(neighbors) for nid, neighbors in adj.items()}
        roots = [max(out_degree, key=out_degree.get)] if out_degree else [nodes[0]["id"]]

    # 3. Calculate Levels using Longest Path (BFS)
    # We use longest path so that a node is placed below ALL of its dependencies
    levels = {nid: 0 for nid in roots}
    queue = deque(roots)
    
    # To prevent infinite loops in cyclic graphs, track visit counts
    visit_count = defaultdict(int)
    max_visits = len(nodes) 
    
    while queue:
        current = queue.popleft()
        current_level = levels[current]
        
        visit_count[current] += 1
        if visit_count[current] > max_visits:
            continue # Break cycle
            
        for neighbor in adj[current]:
            # If we found a longer path to this neighbor, update its level and re-queue
            if neighbor not in levels or levels[neighbor] < current_level + 1:
                levels[neighbor] = current_level + 1
                queue.append(neighbor)

    # 4. Enrich Nodes with Layout Hints
    enriched_nodes = []
    for node in nodes:
        node_id = node["id"]
        enriched_node = dict(node) # Copy original node
        
        # Add layout hints
        enriched_node["layout"] = {
            "level": levels.get(node_id, 0),
            "group": assign_group(node["label"], node_id)
        }
        enriched_nodes.append(enriched_node)
        
    # Sort nodes by level, then by group for a clean structured output
    enriched_nodes.sort(key=lambda x: (x["layout"]["level"], x["layout"]["group"]))

    return {
        "nodes": enriched_nodes,
        "edges": edges
    }

# --- Example Usage ---
if __name__ == "__main__":
    input_data = {
      "nodes": [
        {"id": "user", "label": "User"},
        {"id": "api_gateway", "label": "API Gateway"},
        {"id": "auth_service", "label": "Auth Service"},
        {"id": "database", "label": "Database"},
        {"id": "redis_cache", "label": "Redis Cache"}
      ],
      "edges": [
        {"from": "user", "to": "api_gateway"},
        {"from": "api_gateway", "to": "auth_service"},
        {"from": "api_gateway", "to": "redis_cache"},
        {"from": "auth_service", "to": "database"}
      ]
    }
    
    output_data = build_diagram_layout(input_data)
    
    print("--- Input Data ---")
    print(json.dumps(input_data, indent=2))
    print("\n--- Output Data (With Layout Hints) ---")
    print(json.dumps(output_data, indent=2))
