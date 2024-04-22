import React from "react";
import PageWrapper from "./PageWrapper";
import ResourceCard from "../components/resources/ResourceCard";

const resourcesList = [
  { name: "Plants", navigateTo: "/plants" },
  { name: "Cultivation Types", navigateTo: "/cultivation-types" },
  { name: "Stage Types", navigateTo: "/stage-types" },
  { name: "Measure Units", navigateTo: "/measure-units" },
];

function Resources() {
  return (
    <PageWrapper
      secured={true}
      className="flex items-center justify-center md:mt-0 flex-col gap-6 text-center"
    >
      <h1 className="text-2xl">Select resources you want to view.</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resourcesList.map((resource) => (
          <ResourceCard
            key={resource.name}
            name={resource.name}
            navigateTo={resource.navigateTo}
          />
        ))}
      </div>
    </PageWrapper>
  );
}

export default Resources;
