import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field

# --- Define the Structured Output Schema ---

class Node(BaseModel):
    id: str = Field(..., description="Unique identifier for the node, lowercase with underscores (e.g., 'api_gateway')")
    label: str = Field(..., description="Human-readable label for the node (e.g., 'API Gateway')")

class Edge(BaseModel):
    source: str = Field(..., alias="from", description="ID of the source node")
    target: str = Field(..., alias="to", description="ID of the target node")

class DiagramData(BaseModel):
    nodes: List[Node] = Field(..., description="List of unique architecture components")
    edges: List[Edge] = Field(..., description="List of connections between components")

# --- Parser Module ---

def parse_architecture_description(description: str, client: Any = None) -> Dict[str, Any]:
    """
    Converts a natural language architecture description into structured diagram data (Nodes and Edges).
    
    In a production environment, this uses an LLM (like OpenAI GPT-4o or Gemini) 
    with Structured Outputs to guarantee the JSON matches the DiagramData schema.
    """
    
    system_prompt = """
    You are an expert cloud architect. Extract the architecture components and their connections from the user's description.
    - Create a unique 'id' for each node (lowercase, underscores).
    - Create a human-readable 'label' for each node.
    - Define 'edges' representing the flow of data or requests.
    - Avoid duplicate nodes. If a node is mentioned multiple times, reuse its ID.
    - Keep the logic clean and minimal.
    """

    # If an OpenAI client is provided, use it to extract the structured data
    if client:
        response = client.beta.chat.completions.parse(
            model="gpt-4o-2024-08-06", # Supports strict structured outputs
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": description}
            ],
            response_format=DiagramData,
        )
        # Return the parsed Pydantic model as a dictionary
        return response.choices[0].message.parsed.model_dump(by_alias=True)
    
    # --- Fallback / Mock Implementation for testing without an API key ---
    print("Warning: No LLM client provided. Using mock extraction for demonstration.")
    
    # A very basic heuristic for the specific example (Not recommended for production)
    description_lower = description.lower()
    nodes = {}
    edges = []
    
    # Simple keyword mapping for demonstration
    keywords = {
        "user": "User",
        "api gateway": "API Gateway",
        "auth service": "Auth Service",
        "database": "Database",
        "redis": "Redis Cache",
        "frontend": "Frontend App"
    }
    
    found_entities = []
    for key, label in keywords.items():
        if key in description_lower:
            node_id = key.replace(" ", "_")
            nodes[node_id] = {"id": node_id, "label": label}
            found_entities.append(node_id)
            
    # Create sequential edges based on the order they were found (Mock logic)
    for i in range(len(found_entities) - 1):
        edges.append({"from": found_entities[i], "to": found_entities[i+1]})
        
    # Handle the specific "which connects to auth service and database" split
    if "auth_service" in found_entities and "database" in found_entities and "api_gateway" in found_entities:
        # Override mock edges for the specific example
        edges = [
            {"from": "user", "to": "api_gateway"},
            {"from": "api_gateway", "to": "auth_service"},
            {"from": "auth_service", "to": "database"}
        ]
        
    return {
        "nodes": list(nodes.values()),
        "edges": edges
    }

# --- Example Usage ---
if __name__ == "__main__":
    # Example 1
    input_text_1 = "User sends request to API gateway, which connects to auth service and database"
    output_1 = parse_architecture_description(input_text_1)
    
    print("Input 1:", input_text_1)
    print("Output 1:")
    print(json.dumps(output_1, indent=2))
    print("-" * 40)
    
    # Example 2
    input_text_2 = "Frontend talks to API Gateway. API Gateway routes to Redis and Database."
    output_2 = parse_architecture_description(input_text_2)
    
    print("Input 2:", input_text_2)
    print("Output 2:")
    print(json.dumps(output_2, indent=2))
