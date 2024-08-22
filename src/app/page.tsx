import Builder from "@/page-section/builder/builder";

export const metadata = {
  title: "Builder",
  description: "A simple builder",
  authors: [
    {
      name: "Komal Vedavrat Patwardhan",
      url: "https://github.com/komal-m-raut",
    },
  ],
};
export const viewport = "width=device-width, initial-scale=1";
const IndexPage = () => <Builder />;

export default IndexPage;
