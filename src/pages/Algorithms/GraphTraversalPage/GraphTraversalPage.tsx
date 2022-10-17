import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, Node } from "vis-network";
import GraphRenderer from "../../../components/GraphVisualization/GraphRenderer";
import AlgoPageLayout from "../../../components/Layout/AlgoPageLayout";
import StepController from "../../../components/StepController/StepController";
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
  const [currentHistoryLength, setCurrentHistoryLength] = useState(0);
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
    <AlgoPageLayout
      algorithmName={algorithmName}
      pseudoCode={pseudoCode}
      currentStep={totalHistory[currentHistoryLength - 1]}
      MainContent={
        <>
          <GraphRenderer graph={startGraph} />
          <button onClick={() => test(startGraph)}>test</button>
        </>
      }
      Controller={
        <StepController
          inAutoMode={inAutoMode}
          setInAutoMode={setInAutoMode}
          reset={reset}
          performStep={performStep}
          undoStep={undoStep}
        />
      }
      GeneralSettings={
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
      }
    />
  );
}
