import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';
import {
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Paper,
} from '@mui/material';

// Mapping service types to icons
const serviceTypeIcons = {
  API: '🔗',
  Database: '💾',
  Cache: '🗄️',
  Worker: '👷',
  Frontend: '🌐',
};



const data = {
    nodes: [
      {
        id: 'Node1',
        metrics: { cpu: '80%', memory: '70%' },
        errorRate: '1%',
        serviceType: 'API',
      },
      {
        id: 'Node2',
        metrics: { cpu: '60%', memory: '60%' },
        errorRate: '0.5%',
        serviceType: 'Database',
      },
      {
        id: 'Node3',
        metrics: { cpu: '90%', memory: '80%' },
        errorRate: '2%',
        serviceType: 'Cache',
      },
      {
        id: 'Node4',
        metrics: { cpu: '50%', memory: '40%' },
        errorRate: '0.3%',
        serviceType: 'Worker',
      },
      {
        id: 'Node5',
        metrics: { cpu: '70%', memory: '50%' },
        errorRate: '100%',
        serviceType: 'Frontend',
      },
    ],
    links: [
      { source: 'Node1', target: 'Node2', invocationCount: 10, latency: '200ms' },
      { source: 'Node1', target: 'Node3', invocationCount: 5, latency: '150ms' },
      { source: 'Node2', target: 'Node4', invocationCount: 8, latency: '300ms' },
      { source: 'Node3', target: 'Node5', invocationCount: 7, latency: '250ms' },
    ],
  };
  
  const App = () => (
    <div style={{ height: '100vh', width: '100%' }}>
      <NodeGraph data={data} />
    </div>
  );
  
  export default App;
  