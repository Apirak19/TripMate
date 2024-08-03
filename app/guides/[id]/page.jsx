const GuidePage = async ({ params }) => {
  const { id } = params;

  return (
    <div>
      <h1>Guide {id}</h1>
    </div>
  );
};

export default GuidePage;
