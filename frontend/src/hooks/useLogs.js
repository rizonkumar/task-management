import { useState, useEffect } from "react";
import { logAPI } from "../services/api";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await logAPI.getAll();
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogsByDate = async (date) => {
    setLoading(true);
    try {
      const data = await logAPI.getByDate(date);
      setLogs(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addLog = async (logData) => {
    try {
      const newLog = await logAPI.create(logData);
      setLogs([newLog, ...logs]);
      return newLog;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete log
  const deleteLog = async (id) => {
    try {
      await logAPI.delete(id);
      setLogs(logs.filter((l) => l.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Fetch logs on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  return {
    logs,
    loading,
    error,
    addLog,
    deleteLog,
    fetchLogs,
    fetchLogsByDate,
  };
};
