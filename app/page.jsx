import Example from "@components/Example";

const Home = () => {
  return (
    <div>
      <section className="w-full felx-center flex-col justify-between">
        <h1 className="head_text text-center">
          NFT Pulse
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            {" "}
            Real-Time Crypto Data
          </span>
        </h1>
        <p className="desc text-center">
          The easiest way to read blockchain data.
          <br/>
          Here are two example use cases:
        </p>
      </section>

      <section>
        <Example></Example>
      </section>
    </div>
  );
};

export default Home;
