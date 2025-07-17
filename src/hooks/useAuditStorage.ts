import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
export type Audit = {
  id: string;
  title: string;
  createdAt: string;
};

const AUDIT_KEY = 'audits';

export const useAuditStorage = () => {
  const getAudits = async (): Promise<Audit[]> => {
    const stored = await AsyncStorage.getItem(AUDIT_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const saveAudit = async (audit: Audit): Promise<void> => {
    const audits = await getAudits();
    const updated = [
      {
        ...audit,
        id: uuid.v4().toString(),
      },
      ...audits,
    ];
    await AsyncStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
  };

  const deleteAudit = async (id: string) => {
    const audits = await getAudits();
    const updated = audits.filter(a => a.id !== id);
    await AsyncStorage.setItem('audits', JSON.stringify(updated));
  };

  const clearAudits = async () => {
    await AsyncStorage.removeItem(AUDIT_KEY);
  };

  return { getAudits, saveAudit, clearAudits, deleteAudit };
};
