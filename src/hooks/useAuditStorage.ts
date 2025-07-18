import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import { Audit } from '../interfaces/audit';
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

  const updateAudit = async (updatedAudit: Audit): Promise<void> => {
    const audits = await getAudits();
    const updated = audits.map(a =>
      a.id === updatedAudit.id ? updatedAudit : a,
    );
    await AsyncStorage.setItem(AUDIT_KEY, JSON.stringify(updated));
  };

  return { getAudits, saveAudit, clearAudits, deleteAudit, updateAudit };
};
