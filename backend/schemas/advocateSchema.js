export const advocateSearchSchema = {
  schema: {
    querystring: {
      type: "object",

      required: ["name"],

      properties: {
        name: {
          type: "string",
          minLength: 3,
          maxLength: 50,
        },
      },

      additionalProperties: false,
    },

    response: {
      200: {
        type: "object",

        properties: {
          count: { type: "number" },

          results: {
            type: "array",

            items: {
              type: "object",

              properties: {
                keyval: { type: "string" },
                label: { type: "string" },
                sublabel: { type: ["string", "null"] },
              },

              required: ["keyval", "label"],

              additionalProperties: false,
            },
          },
        },

        required: ["count", "results"],
      },
    },
  },
};
