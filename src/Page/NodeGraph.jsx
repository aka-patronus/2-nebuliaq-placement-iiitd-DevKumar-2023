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
