from typing import Dict, Any

def generate_image_prompt(diagram_data: Dict[str, Any], style: str = "minimal") -> str:
    """
    Converts structured diagram data into a highly optimized prompt for AI image generators.
    """
    nodes = diagram_data.get("nodes", [])
    edges = diagram_data.get("edges", [])
    
    if not nodes:
        return "A blank professional presentation slide."

    # 1. Map node IDs to Labels for readable connections
    node_map = {n["id"]: n["label"] for n in nodes}

    # 2. Group nodes by their layout level to describe spatial hierarchy
    levels = {}
    for node in nodes:
        lvl = node.get("layout", {}).get("level", 0)
        levels.setdefault(lvl, []).append(node["label"])

    # 3. Build the Structural Description
    structure_lines = []
    for lvl in sorted(levels.keys()):
        components = ", ".join(levels[lvl])
        if lvl == 0:
            structure_lines.append(f"At the top level: {components}.")
        else:
            structure_lines.append(f"Below that, level {lvl}: {components}.")

    # 4. Build the Connections Description
    connection_lines = []
    for edge in edges:
        src = node_map.get(edge["from"], edge["from"])
        tgt = node_map.get(edge["to"], edge["to"])
        connection_lines.append(f"An arrow points from {src} to {tgt}.")

    topology_desc = " ".join(structure_lines) + " " + " ".join(connection_lines)

    # 5. Define Style Modifiers
    style_modifiers = {
        "minimal": (
            "Minimalist flat design, clean vector graphic, monochrome with a single accent color (like corporate blue). "
            "Lots of whitespace, crisp sans-serif text labels, simple geometric shapes. "
            "Pure white background, PPT-ready quality, no clutter."
        ),
        "aws": (
            "AWS architecture diagram style, professional cloud infrastructure graphic. "
            "Use standard cloud computing icons, isometric or flat 2D layout. "
            "Color palette: AWS orange, dark blue, and gray. "
            "Pure white background, enterprise presentation quality, highly structured."
        ),
        "dark": (
            "Dark mode architecture diagram, modern futuristic tech aesthetic. "
            "Deep charcoal or dark navy background. Glowing neon accents (cyan and purple) for the arrows and component borders. "
            "High contrast, sleek glassmorphism elements, presentation-ready for a dark-themed slide deck."
        )
    }

    selected_style = style_modifiers.get(style.lower(), style_modifiers["minimal"])

    # 6. Assemble the Final Prompt
    base_prompt = (
        "A high-quality, professional software architecture diagram. "
        "All components must be clearly labeled with readable text. "
        "Clear directional arrows connecting the components. "
    )

    final_prompt = f"{base_prompt}\n\nArchitecture Layout:\n{topology_desc}\n\nVisual Style:\n{selected_style}"
    
    return final_prompt

# --- Example Usage ---
if __name__ == "__main__":
    # Using the output from the previous diagram_builder step
    sample_data = {
      "nodes": [
        {"id": "user", "label": "User", "layout": {"level": 0, "group": "frontend"}},
        {"id": "api_gateway", "label": "API Gateway", "layout": {"level": 1, "group": "backend"}},
        {"id": "auth_service", "label": "Auth Service", "layout": {"level": 2, "group": "backend"}},
        {"id": "database", "label": "Database", "layout": {"level": 3, "group": "database"}}
      ],
      "edges": [
        {"from": "user", "to": "api_gateway"},
        {"from": "api_gateway", "to": "auth_service"},
        {"from": "auth_service", "to": "database"}
      ]
    }

    print("--- Minimal Style ---")
    print(generate_image_prompt(sample_data, "minimal"))
    print("\n--- AWS Style ---")
    print(generate_image_prompt(sample_data, "aws"))
    print("\n--- Dark Theme ---")
    print(generate_image_prompt(sample_data, "dark"))
