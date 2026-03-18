import type { ObjectifyClient } from '../client.js';
import type { ObjectType, Property, PaginatedResponse } from '../types.js';

export class SchemaResource {
  constructor(private client: ObjectifyClient) {}

  listTypes(query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<ObjectType>> {
    return this.client.get('/schema/types', query);
  }
  getType(typeId: string): Promise<ObjectType> {
    return this.client.get(`/schema/types/${typeId}`);
  }
  createType(data: { name: string }): Promise<ObjectType> {
    return this.client.post('/schema/types', data);
  }
  updateType(typeId: string, data: { name: string }): Promise<ObjectType> {
    return this.client.patch(`/schema/types/${typeId}`, data);
  }
  deleteType(typeId: string): Promise<void> {
    return this.client.delete(`/schema/types/${typeId}`);
  }
  listProperties(typeId: string): Promise<Property[]> {
    return this.client.get(`/schema/types/${typeId}/properties`);
  }
  getProperty(typeId: string, propertyId: string): Promise<Property> {
    return this.client.get(`/schema/types/${typeId}/properties/${propertyId}`);
  }
  createProperty(typeId: string, data: { name: string; data_type: string; is_indexed?: boolean; is_sortable?: boolean; is_unique?: boolean; is_required?: boolean; default_value?: string; validation_json?: string }): Promise<Property> {
    return this.client.post(`/schema/types/${typeId}/properties`, data);
  }
  updateProperty(typeId: string, propertyId: string, data: Partial<{ name: string; is_indexed: boolean; is_sortable: boolean; is_unique: boolean; is_required: boolean; default_value: string; validation_json: string }>): Promise<Property> {
    return this.client.patch(`/schema/types/${typeId}/properties/${propertyId}`, data);
  }
  deleteProperty(typeId: string, propertyId: string): Promise<void> {
    return this.client.delete(`/schema/types/${typeId}/properties/${propertyId}`);
  }
}
