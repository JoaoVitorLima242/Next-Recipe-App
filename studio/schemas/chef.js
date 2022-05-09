/* export type Chef = {
    name: string;
    title: string;
    type: string;
    fields: FieldObj[];
};

export type FieldObj = {
    name: string;
    title: string;
    type: string;
    options?: {
        hotspot?: boolean
    },
    of?: OfArray[];
};

export type OfArray = {
    title: any;
    type: string;
    styles: StyleObj[];
    list: any[];
}

export type StyleObj = {
    title: string;
    type: string;
} */

export default {
    name: "chef",
    title: "Chef",
    type: "document",
    fields: [
      {
        name: "name",
        title: "Chef's Name",
        type: "string",
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: {
          hotspot: true,
        },
      },
      {
        name: "bio",
        title: "Bio",
        type: "array",
        of: [
          {
            title: "Block",
            type: "block",
            styles: [{ title: "Normal", value: "normal" }],
            lists: [],
          },
        ],
      },
    ],
  };