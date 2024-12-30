export const getServerSideProps = async ({ query }) => {
  console.log(query.test);

  console.log("edit", query.test.includes("edit"));
  console.log("create", query.test.includes("create"));

  if (
    query.test &&
    !query.test.includes("edit") &&
    !query.test.includes("aaa")
  ) {
    console.log("not found");
    return { notFound: true };
  }

  return { props: {} };
};

export default function TestPage() {
  return <div>Test</div>;
}
