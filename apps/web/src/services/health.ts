import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api';
import type { HealthCheckResponse } from '../types/api';

export async function checkHealth(): Promise<HealthCheckResponse> {
  return apiClient.get<HealthCheckResponse>('/health');
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
    refetchInterval: 30000,
    retry: 3,
  });
}