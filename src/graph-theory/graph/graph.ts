import cytoscape, {
  Core,
  NodeDefinition,
  EdgeDefinition,
  NodeCollection,
} from 'cytoscape'
import { Parser } from '../parser/parser'
import { Node } from '../tree/tree.interface'
import { GraphData, IEdge, IGraph, IVertex, Visit } from './graph.interface'

/**
 * (1) Implement IGraph interface
 */
const parser: Parser = (tree: Node): GraphData => {
  const data: GraphData<IVertex, IEdge> = {
    vertices: [],
    edges: []
  };
  data.vertices.push( <IVertex>{ id:tree.id, name: tree.name});
  if (!tree.children) {
    return data;
  }

  for (const childNode of tree.children) {
    const { vertices, edges } = parser(childNode);

    data.vertices.push(...vertices);
    data.edges.push(...edges);
    data.edges.push(<IEdge>{ source: tree.id, target: childNode.id });
  }
  return data;
}

export class Graph implements IGraph {
  tree: Node;
  cy: Core;

  constructor(tree: Node) {
    /**
     * (2) Use Parser interface to parse Node
     */

    this.tree = tree;
    const graphData = parser(tree);

    /**
     * (3) Initialize cytoscape with parsed data
     */
    this.cy = cytoscape({
      elements: {
        nodes: graphData.vertices.map(vertex => <NodeDefinition>{ data: vertex }),
        edges: graphData.edges.map(edge => <EdgeDefinition>{ data: edge }),
      }
    });

  }
  /**
   * (4) Use cytoscape under the hood
   */

   getRootNodeId = (): string|undefined => {
    const nodes = <NodeCollection>this.cy.getElementById(this.tree.id);
    if (!nodes.length) {
      return undefined;
    }
    const rootNode = nodes[0];
    const rootNodeId = `#${rootNode.data().id}`;
    return rootNodeId;
  }
    
  bfs(visit: Visit<IVertex, IEdge>) {
    const rootNodeId = this.getRootNodeId();
    if( !rootNodeId ){
      return;
    }

    this.cy.elements().bfs({
      roots: rootNodeId,
      visit: function (v, e) {
        visit(v.data(), { source: e?.source().data().id, target:e?.target().data().id});
      },
      directed: false
    });
  }
  /**
   * (5) Use cytoscape under the hood 
   */

  dfs(visit: Visit<IVertex, IEdge>) {
    const rootNodeId = this.getRootNodeId();
    if( !rootNodeId ){
      return;
    }
    this.cy.elements().dfs({
      roots: rootNodeId,
      visit: function (v, e) {
        visit(v.data(), { source: e?.source().data().id, target:e?.target().data().id});
      },
      directed: false
    });
  }
}
