export interface Preview {
  id: string
  tool_type: 'linkedin' | 'email'
  content_json: Record<string, unknown>
  created_at: Date
}

export interface PreviewEvent {
  id: number
  tool_type: 'linkedin' | 'email'
  action: 'preview' | 'export'
  created_at: Date
}
