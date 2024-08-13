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

const getNodeBorderColor = (errorRate) => {
    const errorPercentage = parseFloat(errorRate.replace('%', '')) / 100;
    const red = Math.round(errorPercentage * 255);
    const green = Math.round((1 - errorPercentage) * 255);
    return `rgb(${red}, ${green}, 0)`;
  };
  
  const NodeGraph = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const searchLower = searchQuery.toLowerCase();
      // Filter nodes based on search query
      const filteredNodes = data.nodes.filter((node) =>
        node.id.toLowerCase().includes(searchLower)
      );
  
      // Create a set of valid node IDs
      const validNodeIds = new Set(filteredNodes.map((node) => node.id));
  
      // Filter links to include only those with valid node IDs
      const filteredLinks = data.links.filter(
        (link) =>
          validNodeIds.has(link.source) && validNodeIds.has(link.target)
      );
  
      setFilteredData({
        nodes: filteredNodes,
        links: filteredLinks,
      });
    }, [searchQuery, data]);
  
    const handleNodeClick = (nodeId) => {
      const node = data.nodes.find((node) => node.id === nodeId);
      setSelectedNode(node);
    };
  
    const handleLinkClick = (source, target) => {
      const edge = data.links.find(
        (link) => link.source === source && link.target === target
      );
      setSelectedEdge(edge);
    };
  
    const renderCustomNodeElement = ({ nodeDatum }) => (
      <g>
        <circle
          r="10"
          fill="#4caf50"
          stroke={getNodeBorderColor(nodeDatum.errorRate)}
          strokeWidth="3"
        />
        <text x="12" y="5" fontSize="8" fill="#000" fontWeight="bold">
          {serviceTypeIcons[nodeDatum.serviceType]}
        </text>
        <text
          x="0"
          y="20"
          fontSize="10"
          fill="#000"
          textAnchor="middle"
          fontWeight="bold"
        >
          {nodeDatum.id}
        </text>
      </g>
    );
  
    const config = {
      nodeHighlightBehavior: true,
      node: {
        color: '#4caf50',
        size: 200,
        highlightStrokeColor: '#03a9f4',
        fontSize: 12,
        renderLabel: false,
      },
      link: {
        highlightColor: '#ff5722',
      },
      d3: {
        gravity: -400,
      },
      directed: true,
      zoom: true,
      panAndZoom: true,
      renderCustomNodeElement,
    };
  
    return (
      <Container>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <TextField
                label="Search Nodes"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                helperText="Type to search for nodes by ID"
              />
              {searchQuery && filteredData.nodes.length === 0 && (
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '16px' }}>
                  No nodes match your search criteria.
                </Typography>
              )}
              {selectedNode && (
                <Card
                  style={{
                    marginTop: '16px',
                    borderColor:
                      selectedNode.errorRate === '100%'
                        ? 'red'
                        : getNodeBorderColor(selectedNode.errorRate),
                    borderWidth: '2px',
                    borderStyle: 'solid',
                  }}
                >
                  <CardHeader title="Node Information" />
                  <CardContent>
                    <Typography variant="h6">{selectedNode.id}</Typography>
                    <Typography variant="body2">
                      Metrics: {JSON.stringify(selectedNode.metrics)}
                    </Typography>
                    <Typography variant="body2">
                      Error Rates: {selectedNode.errorRate}
                    </Typography>
                    <Typography variant="body2">
                      Service Type: {serviceTypeIcons[selectedNode.serviceType]}{' '}
                      {selectedNode.serviceType}
                    </Typography>
                  </CardContent>
                </Card>
              )}
              {selectedEdge && (
                <Card style={{ marginTop: '16px' }}>
                  <CardHeader title="Edge Information" />
                  <CardContent>
                    <Typography variant="h6">
                      {`${selectedEdge.source} -> ${selectedEdge.target}`}
                    </Typography>
                    <Typography variant="body2">
                      Invocation Count: {selectedEdge.invocationCount}
                    </Typography>
                    <Typography variant="body2">
                      Latency: {selectedEdge.latency}
                    </Typography>
                  </CardContent>
                </Card>
              )}
            </Paper>
          </Grid>
          <Grid item md={8}>
            <Box
              component={Paper}
              elevation={3}
              style={{ height: '100%', width: '100%', padding: '16px' }}
            >
              <Graph
                id="graph-id"
                data={filteredData}
                config={config}
                onClickNode={handleNodeClick}
                onClickLink={handleLinkClick}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
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
  