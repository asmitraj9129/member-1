// Mock Data Service - Simulates backend API responses

const mockRiskData = {
  risk_score: 78,
  risk_level: "RED",
  probability: 0.81,
  confidence: 0.76,
  top_drivers: [
    "3-hour rainfall is critically high (58mm)",
    "Water level rising rapidly (+12cm/hr)",
    "Bridge B17 lies in predicted flow corridor",
    "Soil saturation at 82% capacity"
  ],
  recommended_action: [
    "Inspect Bridge B17 immediately",
    "Restrict traffic on Road R04",
    "Notify Village V08 for evacuation",
    "Alert downstream monitoring station"
  ],
  uncertainty_note: "Water-level signal is simulated in MVP",
  time_to_impact: "42 minutes",
  last_updated: new Date().toISOString()
};

const mockSensorData = {
  rainfall_mm_1h: 58.2,
  rainfall_mm_3h: 121.4,
  water_level_cm: 134,
  water_rise_rate_cm_hr: 12,
  soil_moisture_percent: 82,
  river_flow_cumecs: 340,
  data_type: "simulated",
  source_confidence: 0.82,
  sensor_health: "ACTIVE"
};

const mockAlerts = [
  {
    id: "A001",
    level: "RED",
    title: "Flash Flood Warning — Sub-basin SB-03",
    location: "Bridge B17, Road R04",
    time: "10 mins ago",
    status: "New",
    details: "Water level has exceeded critical threshold. Immediate action required.",
    affected: ["Bridge B17", "Road R04", "Village V08"]
  },
  {
    id: "A002",
    level: "ORANGE",
    title: "Elevated Risk — River Sector RS-07",
    location: "River Segment RS-07",
    time: "28 mins ago",
    status: "Acknowledged",
    details: "Rainfall intensity above moderate threshold. Monitoring elevated.",
    affected: ["River RS-07", "Village V12"]
  },
  {
    id: "A003",
    level: "ORANGE",
    title: "Soil Saturation Warning — Upper Basin",
    location: "Upper Basin Zone UB-02",
    time: "1 hr ago",
    status: "Inspection",
    details: "Soil moisture at 82%. Runoff risk significantly elevated.",
    affected: ["Zone UB-02", "Drainage D04"]
  },
  {
    id: "A004",
    level: "GREEN",
    title: "Normal Flow — Western Channel",
    location: "Western Channel WC-01",
    time: "2 hrs ago",
    status: "Resolved",
    details: "Flow levels returned to normal range.",
    affected: []
  }
];

const mockHistoricalRisk = [
  { time: "06:00", risk: 22, rainfall: 5 },
  { time: "07:00", risk: 28, rainfall: 12 },
  { time: "08:00", risk: 35, rainfall: 22 },
  { time: "09:00", risk: 48, rainfall: 38 },
  { time: "10:00", risk: 61, rainfall: 52 },
  { time: "11:00", risk: 72, rainfall: 58 },
  { time: "Now",   risk: 78, rainfall: 58 },
];

const mockScenarios = {
  baseline: { risk_level: "ORANGE", risk_score: 52, time_to_impact: "68 min" },
  heavy_rain: { risk_level: "RED", risk_score: 78, time_to_impact: "42 min" },
  extreme_rain: { risk_level: "RED", risk_score: 94, time_to_impact: "18 min" },
};

const mockLayers = {
  villages: [
    { id: "V08", name: "Village V08", lat: 26.82, lng: 73.94, risk: "HIGH", population: 1240 },
    { id: "V12", name: "Village V12", lat: 26.79, lng: 73.88, risk: "MEDIUM", population: 890 },
    { id: "V03", name: "Village V03", lat: 26.87, lng: 73.91, risk: "LOW", population: 670 },
  ],
  bridges: [
    { id: "B17", name: "Bridge B17", lat: 26.83, lng: 73.93, status: "CRITICAL" },
    { id: "B09", name: "Bridge B09", lat: 26.77, lng: 73.96, status: "MONITOR" },
  ],
  shelters: [
    { id: "S01", name: "Relief Shelter 01", lat: 26.85, lng: 73.89, capacity: 500 },
    { id: "S02", name: "Relief Shelter 02", lat: 26.80, lng: 73.92, capacity: 350 },
  ]
};

const mockBasinHealth = {
  drainage_capacity: 68,
  soil_absorption: 18,
  river_conveyance: 72,
  infrastructure_risk: 84,
  overall_health: 42,
  status: "STRESSED"
};

const mockReplayEvents = [
  { time: "2024-08-14 06:00", event: "Rain begins — 8mm/hr", risk: "GREEN" },
  { time: "2024-08-14 08:30", event: "Intensity rises — 22mm/hr", risk: "ORANGE" },
  { time: "2024-08-14 10:00", event: "River level exceeds normal", risk: "ORANGE" },
  { time: "2024-08-14 11:15", event: "Bridge B17 alert triggered", risk: "RED" },
  { time: "2024-08-14 11:45", event: "Village V08 evacuated", risk: "RED" },
  { time: "2024-08-14 13:00", event: "Peak flow recorded", risk: "RED" },
  { time: "2024-08-14 16:00", event: "Water level receding", risk: "ORANGE" },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getRiskData = async () => { await delay(300); return { ...mockRiskData }; };
export const getSensorData = async () => { await delay(200); return { ...mockSensorData }; };
export const getAlerts = async () => { await delay(250); return [...mockAlerts]; };
export const getHistoricalRisk = async () => { await delay(300); return [...mockHistoricalRisk]; };
export const getScenarios = async () => { await delay(200); return { ...mockScenarios }; };
export const getMapLayers = async () => { await delay(400); return { ...mockLayers }; };
export const getBasinHealth = async () => { await delay(200); return { ...mockBasinHealth }; };
export const getReplayEvents = async () => { await delay(200); return [...mockReplayEvents]; };

export const runWhatIf = async (params) => {
  await delay(500);
  const { rainfallChange = 0, soilChange = 0, waterLevelChange = 0, bridgeBlockage = false } = params;
  const delta = (rainfallChange * 0.4) + (soilChange * 0.2) + (waterLevelChange * 0.3) + (bridgeBlockage ? 15 : 0);
  const newScore = Math.min(99, Math.max(0, 52 + delta));
  const newTTI = Math.max(5, 68 - Math.floor(delta * 1.2));
  return {
    baseline_risk: "ORANGE",
    baseline_score: 52,
    simulated_risk: newScore > 75 ? "RED" : newScore > 45 ? "ORANGE" : "GREEN",
    simulated_score: Math.round(newScore),
    risk_score_change: Math.round(delta),
    time_to_impact: `${newTTI} min`,
    bridge_B17_time_to_impact_change: bridgeBlockage ? `-22 minutes` : `No change`,
    affected_assets: newScore > 60 ? ["Bridge B17", "Road R04", "Village V08"] : newScore > 40 ? ["River RS-07"] : [],
    recommended_action: newScore > 75 ? "Restrict traffic immediately" : newScore > 45 ? "Monitor closely" : "No action needed"
  };
};

export default { getRiskData, getSensorData, getAlerts, getHistoricalRisk, getScenarios, getMapLayers, getBasinHealth, getReplayEvents, runWhatIf };
