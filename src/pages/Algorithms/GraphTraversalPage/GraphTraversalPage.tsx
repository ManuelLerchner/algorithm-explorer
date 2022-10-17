import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Edge, Node } from "vis-network";
import AlgorithmController from "../../../components/AlgorithmController/AlgorithmController";
import GraphRenderer from "../../../components/GraphVisualization/GraphRenderer";
import { GraphType } from "../../../model/CustomPresetTypes";
import { Graph, GraphNode } from "../../../model/Graph";
import { GraphTraversalStep } from "../../../model/Steps/GraphTraversalStep";
import { createGraph } from "./../../../util/GraphCreators";
import GraphTraversalSettings from "./GraphTraversalSettings";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";

const test = (graph: Graph) => {
  //update color to green

  graph.edges_dataset.update({ from: 2, to: 3, color: { color: "green" } });
};

export default function GraphTraversalPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (
    graph: Graph,
    root: GraphNode,
    target: GraphNode
  ) => IterableIterator<GraphTraversalStep>;
  pseudoCode: string[];
}) {
  const [amountNodes, setAmountNodes] = useState(7);
  const [startGraph, setStartGraph] = useState<Graph>(new Graph());
  const [totalHistory, setTotalHistory] = useState<GraphTraversalStep[]>([]);
  const [currentHistory, setCurrentHistory] = useState<GraphTraversalStep[]>(
    []
  );
  const [animationSpeed, setAnimationSpeed] = useState(4);
  const [graphType, setGraphType] = useState<GraphType>("grid");
  const [inAutoMode, setInAutoMode] = useState(false);
  const [animationActivated, setAnimationActivated] = useState(true);

  const [startNode, setStartNode] = useState<GraphNode>(new GraphNode(-1));
  const [endNode, setEndNode] = useState<GraphNode>(new GraphNode(-1));

  const stepIterator = useMemo(
    () => algorithm(startGraph, startNode, endNode),
    [startGraph, algorithm, startNode, endNode]
  );

  // Initializes the start-array using random ordering
  useEffect(() => {
    setStartGraph(createGraph(amountNodes, graphType));
  }, [amountNodes, graphType]);

  // Resets the History-View
  function reset() {
    setTotalHistory([]);
    setCurrentHistory([]);
    setInAutoMode(false);
    setStartGraph(createGraph(amountNodes, graphType));
  }

  //Performs a single step of the Sorting-Calculation
  const performStep = useCallback(() => {
    if (currentHistory.length >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        setInAutoMode(false);
        return;
      }

      const updateHistory = [...totalHistory, step.value];
      setTotalHistory(updateHistory);
      setCurrentHistory(updateHistory);
    } else {
      const newHistory = totalHistory.slice(0, currentHistory.length + 1);
      setCurrentHistory(newHistory);
    }
  }, [totalHistory, stepIterator, currentHistory.length]);

  // Goes back a step in the Sorting-Calculation
  function undoStep() {
    const newLength = currentHistory.length - 1;

    if (newLength >= 0) {
      const newHistory = totalHistory.slice(0, newLength);
      setCurrentHistory(newHistory);
      setInAutoMode(false);
    }
  }

  //Deactivate animation if to fast
  useEffect(() => {
    if (animationSpeed >= 5) {
      setAnimationActivated(false);
    } else {
      setAnimationActivated(true);
    }
  }, [animationSpeed]);

  // Runs the "performStep" loop when "auto-mode" is enabled
  useEffect(() => {
    if (inAutoMode) {
      let ms = 5000 / Math.pow(animationSpeed, 2);

      let timer = setTimeout(() => {
        if (inAutoMode) {
          performStep();
        }
      }, ms);
      return () => clearTimeout(timer);
    }
  }, [inAutoMode, performStep, animationSpeed]);

  // Performs initial sorting when the auto-mode is enabled
  useEffect(() => {
    if (inAutoMode) {
      performStep();
    }
    // eslint-disable-next-line
  }, [inAutoMode]);

  return (
    <>
      <div className="flex flex-col w-11/12 md:max-w-4xl md:mr-4 overflow-auto scroll-container h-full py-16">
        <GraphRenderer graph={startGraph} />
        <button onClick={() => test(startGraph)}>test</button>
      </div>

      <div className="flex flex-col max-w-md mb-12 h-full overflow-y-auto py-6 pr-2">
        <AlgorithmController
          algorithmName={algorithmName}
          inAutoMode={inAutoMode}
          setInAutoMode={setInAutoMode}
          reset={reset}
          performStep={performStep}
          currentStep={currentHistory[currentHistory.length - 1]}
          undoStep={undoStep}
          pseudoCode={pseudoCode}
        />

        <GraphTraversalSettings
          amountNodes={amountNodes}
          setAmountNodes={setAmountNodes}
          setStartGraph={setStartGraph}
          reset={reset}
          setAnimationSpeed={setAnimationSpeed}
          setInAutoMode={setInAutoMode}
          setGraphType={setGraphType}
          animationActivated={animationActivated}
          setAnimationActivated={setAnimationActivated}
        />
      </div>
    </>
  );
}
