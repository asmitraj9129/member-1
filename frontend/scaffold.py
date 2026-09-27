import os

base_dir = "c:/Users/hiii/Desktop/member1/frontend/src"

directories = [
    "components",
    "pages",
    "services"
]

for d in directories:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

components = [
    "Navbar.jsx", "RiskCard.jsx", "AlertCard.jsx", "RiskChart.jsx", "RiskMap.jsx", 
    "ConfidenceCard.jsx", "WhatIfPanel.jsx", "FloodPathLayer.jsx", "BasinHealthPassport.jsx",
    "TimeToImpactCard.jsx", "EvidenceTimeline.jsx", "LayerToggle.jsx", "AlertActionPanel.jsx"
]

for comp in components:
    with open(os.path.join(base_dir, "components", comp), "w") as f:
        comp_name = comp.replace(".jsx", "")
        f.write(f'''import React from "react";

export default function {comp_name}(props) {{
  return (
    <div className="glass-panel">
      <div className="glass-header">
        <h3 className="glass-title">{comp_name}</h3>
      </div>
      <div>Component Content</div>
    </div>
  );
}}
''')

pages = ["Dashboard.jsx", "Alerts.jsx", "Analytics.jsx", "Simulation.jsx", "Login.jsx"]

for page in pages:
    with open(os.path.join(base_dir, "pages", page), "w") as f:
        page_name = page.replace(".jsx", "")
        f.write(f'''import React from "react";

export default function {page_name}() {{
  return (
    <div className="page-content">
      <h1 className="text-gradient" style={{marginBottom: "20px"}}>{page_name}</h1>
      <p>Welcome to {page_name}</p>
    </div>
  );
}}
''')

services = ["api.js", "riskService.js", "alertService.js", "simulationService.js"]
for s in services:
    with open(os.path.join(base_dir, "services", s), "w") as f:
        f.write('// Mock service\n')

print("Scaffolding complete.")
