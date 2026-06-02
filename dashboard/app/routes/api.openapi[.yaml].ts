import spec from "../../../docs/api/openapi.yaml?raw";

export function loader() {
  return new Response(spec, {
    headers: {
      "Content-Type": "application/yaml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
