import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute()({
  component: CaseTrack
})

export function CaseTrack() {
  const { caseID } = Route.useParams()
  return (
    <div>
      <h1>Case Track Page</h1>
      <p>This is the {caseID} Case Track page.</p>
    </div>
  );
}