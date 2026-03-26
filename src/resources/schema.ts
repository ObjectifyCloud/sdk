import type { ObjectifyClient } from '../client.js';
import type { ObjectType, Property, PaginatedResponse } from '../types.js';

export class SchemaResource {
  constructor(private client: ObjectifyClient) {}

  listTypes(query?: { cursor?: string; limit?: number }): Promise<PaginatedResponse<ObjectType>> {
    return this.client.get('/v1/object-types', query);
  }
  getType(typeId: string): Promise<ObjectType> {
    return this.client.get(`/v1/object-types/${typeId}`);
  }
  createType(data: { name: string }): Promise<ObjectType> {
    return this.client.post('/v1/object-types', data);
  }
  updateType(typeId: string, data: { name: string }): Promise<ObjectType> {
    return this.client.patch(`/v1/object-types/${typeId}`, data);
  }
  deleteType(typeId: string): Promise<void> {
    return this.client.delete(`/v1/object-types/${typeId}`);
  }
  listProperties(typeId: string): Promise<Property[]> {
    return this.client.get(`/v1/object-types/${typeId}/properties`);
  }
  getProperty(typeId: string, propertyId: string): Promise<Property> {
    return this.client.get(`/v1/object-types/${typeId}/properties/${propertyId}`);
  }
  createProperty(typeId: string, data: { name: string; data_type: string; is_indexed?: boolean; is_sortable?: boolean; is_unique?: boolean; is_required?: boolean; default_value?: string; validation_json?: string }): Promise<Property> {
    return this.client.post(`/v1/object-types/${typeId}/properties`, data);
  }
  updateProperty(typeId: string, propertyId: string, data: Partial<{ name: string; is_indexed: boolean; is_sortable: boolean; is_unique: boolean; is_required: boolean; default_value: string; validation_json: string }>): Promise<Property> {
    return this.client.patch(`/v1/object-types/${typeId}/properties/${propertyId}`, data);
  }
  deleteProperty(typeId: string, propertyId: string): Promise<void> {
    return this.client.delete(`/v1/object-types/${typeId}/properties/${propertyId}`);
  }
}
