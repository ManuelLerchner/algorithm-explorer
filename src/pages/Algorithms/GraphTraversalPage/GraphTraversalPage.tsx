import { useCallback, useEffect, useMemo, useState } from "react";
import GraphRenderer from "../../../components/GraphVisualization/GraphRenderer";
import AlgoPageLayout from "../../../components/Layout/AlgoPageLayout";
import StepController from "../../../components/StepController/StepController";
import { GraphType } from "../../../model/CustomPresetTypes";
import { Graph } from "../../../model/Graph";
import { GraphStep } from "../../../model/Steps/GraphStep";
import { createGraph } from "./../../../util/GraphCreators";
import GraphTraversalSettings from "./GraphTraversalSettings";

export default function GraphTraversalPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (
    graph: Graph,
    root: number,
    target: number
  ) => IterableIterator<GraphStep>;
  pseudoCode: string[];
}) {
  const [amountNodes, setAmountNodes] = useState(16);
  const [startGraph, setStartGraph] = useState<Graph>(new Graph());
  const [totalHistory, setTotalHistory] = useState<GraphStep[]>([]);
  const [currentView, setCurrentView] = useState(0);

  const [animationSpeed, setAnimationSpeed] = useState(4);
  const [graphType, setGraphType] = useState<GraphType>("tree");
  const [inAutoMode, setInAutoMode] = useState(false);
  const [animationActivated, setAnimationActivated] = useState(true);

  const [startNode, setStartNode] = useState(1);
  const [endNode, setEndNode] = useState(amountNodes);

  const stepIterator = useMemo(
    () => algorithm(startGraph, startNode, endNode),
    [startGraph, algorithm, startNode, endNode]
  );

  // Initializes the start-array using random ordering
  useEffect(() => {
    const graph = createGraph(amountNodes, graphType);
    graph.clearEdgesLabels();

    setStartGraph(graph);
  }, [amountNodes, graphType]);

  // Resets the History-View
  function reset() {
    setTotalHistory([]);
    setInAutoMode(false);
    setCurrentView(0);
    const graph = createGraph(amountNodes, graphType);
    graph.clearEdgesLabels();

    setStartGraph(graph);
  }

  //Performs a single step of the Sorting-Calculation
  const performStep = useCallback(() => {
    startGraph.disableMovement();
    if (currentView >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        setInAutoMode(false);
        return;
      }

      var totalVisitedNodes = [...totalHistory, step.value].flatMap(
        (step) => step.visited ?? []
      );

      var totalExploredNodes = [...totalHistory, step.value].flatMap(
        (step) => step.explored ?? []
      );

      step.value.visited = [...new Set(totalVisitedNodes)];
      step.value.explored = [...new Set(totalExploredNodes)];

      const updateHistory = [...totalHistory, step.value];
      setTotalHistory(updateHistory);
      setCurrentView(currentView + 1);
    } else {
      setCurrentView(currentView + 1);
    }
  }, [totalHistory, stepIterator, currentView, startGraph]);

  // Goes back a step in the Sorting-Calculation
  function undoStep() {
    const newLength = currentView - 1;

    if (newLength >= 0) {
      setCurrentView(newLength);
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

  // color Nodes
  useEffect(() => {
    const currentStep = totalHistory[currentView - 1];

    // reset color of all nodes
    startGraph.nodes_dataset?.forEach((node) => {
      startGraph.nodes_dataset.update({
        id: node.id,
        color: { background: "#ffffff", border: "#000000" },
        borderWidth: 1,
      });
    });

    //set border of start and end node
    if (startGraph.nodes_dataset) {
      startGraph.nodes_dataset.update({
        id: startNode,
        label: "Start / " + startNode,
      });
      startGraph.nodes_dataset.update({
        id: endNode,
        label: "Goal / " + endNode,
      });
    }

    //set color of visited nodes
    currentStep?.visited?.forEach((id) => {
      startGraph.nodes_dataset.update({
        id,
        color: { background: "#FFB733" },
      });
    });

    //set color of explored nodes
    currentStep?.explored?.forEach((id) => {
      startGraph.nodes_dataset.update({
        id,
        color: { background: "#5CAD5C" },
      });
    });

    //set color of current node
    if (currentStep?.currentNode) {
      startGraph.nodes_dataset.update({
        id: currentStep.currentNode,
        color: {
          background: "#FF5733",
        },
      });
    }
  }, [currentView, totalHistory, startGraph, startNode, endNode]);

  return (
    <AlgoPageLayout
      algorithmName={algorithmName}
      pseudoCode={pseudoCode}
      currentStep={totalHistory[currentView - 1]}
      MainContent={<GraphRenderer graph={startGraph} />}
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
          startNode={startNode}
          endNode={endNode}
          setStartNode={setStartNode}
          setEndNode={setEndNode}
          graphType={graphType}
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
