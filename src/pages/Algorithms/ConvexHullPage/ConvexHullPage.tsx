import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, Node } from "vis-network";
import GraphRenderer from "../../../components/GraphVisualization/GraphRenderer";
import AlgoPageLayout from "../../../components/Layout/AlgoPageLayout";
import StepController from "../../../components/StepController/StepController";
import { GraphType } from "../../../model/CustomPresetTypes";
import { Graph, GraphNode } from "../../../model/Graph";
import { GrahamStep } from "../../../model/Steps/GrahamStep";
import { createGraph } from "../../../util/GraphCreators";
import ConvexHullSettings from "./ConvexHullSettings";
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";

export default function ConvexHullPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (graph: Graph) => IterableIterator<GrahamStep>;
  pseudoCode: string[];
}) {
  const [amountNodes, setAmountNodes] = useState(32);
  const [startGraph, setStartGraph] = useState<Graph>(new Graph());
  const [totalHistory, setTotalHistory] = useState<GrahamStep[]>([]);
  const [currentView, setCurrentView] = useState(0);

  const [animationSpeed, setAnimationSpeed] = useState(4);
  const [inAutoMode, setInAutoMode] = useState(false);
  const [animationActivated, setAnimationActivated] = useState(true);

  const stepIterator = useMemo(
    () => algorithm(startGraph),
    [startGraph, algorithm]
  );

  // Resets the History-View
  function reset() {
    setTotalHistory([]);
    setInAutoMode(false);
    setCurrentView(0);
    const graph = createGraph(amountNodes, "random");
    graph.clearLabels();
    graph.clearEdges();
    setStartGraph(graph);
  }

  // Initializes the start-array using random ordering
  useEffect(() => {
    const graph = createGraph(amountNodes, "random");
    graph.clearEdges();
    graph.clearLabels();

    setStartGraph(graph);
  }, [amountNodes]);

  //Performs a single step of the Sorting-Calculation
  const performStep = useCallback(() => {
    startGraph.disableMovement();
    if (currentView >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        setInAutoMode(false);
        return;
      }

      const updateHistory = [...totalHistory, step.value];
      setTotalHistory(updateHistory);
      setCurrentView(currentView + 1);
    } else {
      setCurrentView(currentView + 1);
    }
  }, [totalHistory, stepIterator, currentView]);

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
    if (!currentStep) return;

    // reset color of all nodes
    startGraph.nodes_dataset?.forEach((node) => {
      startGraph.nodes_dataset.update({
        id: node.id,
        color: { background: "#ffffff", border: "#000000" },
        borderWidth: 1,
      });
    });

    //set color of visited nodes
    [...(currentStep?.labels?.entries() || [])].forEach(([id, label]) => {
      startGraph.nodes_dataset.update({
        id,
        label,
      });
    });

    if (currentStep.rootNode) {
      //set color of explored nodes
      startGraph.nodes_dataset.update({
        id: currentStep.rootNode,
        color: { background: "#5CAD5C" },
      });
    }

    for (let id of currentStep.markedNodes || []) {
      startGraph.nodes_dataset.update({
        id,
        color: { background: "#FFD700" },
      });
    }

    if (currentStep.currentNode) {
      //set color of explored nodes
      startGraph.nodes_dataset.update({
        id: currentStep.currentNode,
        color: { background: "#FF3333" },
      });
    }

    // add edges of stack
    let prev = currentStep?.stack?.[currentStep?.stack?.length - 1];
    startGraph.edges_dataset.clear();
    for (let edge of currentStep?.stack || []) {
      startGraph.edges_dataset.update({
        from: prev,
        to: edge,
        color: { color: "#FF3333" },
        physics: false,
        smooth: { enabled: false },
        arrows: { to: { enabled: false } },
        dashes: true,
      });
      prev = edge;
    }
  }, [currentView, totalHistory, startGraph]);

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
        <ConvexHullSettings
          amountNodes={amountNodes}
          setAmountNodes={setAmountNodes}
          setStartGraph={setStartGraph}
          reset={reset}
          setAnimationSpeed={setAnimationSpeed}
          setInAutoMode={setInAutoMode}
          animationActivated={animationActivated}
          setAnimationActivated={setAnimationActivated}
        />
      }
    />
  );
}
