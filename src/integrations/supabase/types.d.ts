
export interface Device {
  id: string;
  user_id: string;
  model: string;
  imei: string | null;
  phone_number: string | null;
  carrier: string | null;
  created_at: string;
  updated_at: string;
}

export interface Incident {
  id: string;
  user_id: string;
  device_id: string | null;
  incident_type: 'Roubo' | 'Perda' | 'Outro';
  description: string | null;
  location: { lat: number; lng: number } | null;
  status: 'open' | 'resolved';
  created_at: string;
  updated_at: string;
}

export interface ChecklistItem {
  id: string;
  incident_id: string;
  item_type: 'device_block' | 'bank_block' | 'carrier_contact' | 'police_report';
  status: 'pending' | 'completed';
  notes: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  user_id: string;
  sender: 'user' | 'system';
  message: string;
  created_at: string;
}
