import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import format from "date-fns/format";
import InfoCard from "../components/InfoCard";
import Pagination from "../components/Pagination";

function search({ searchResults }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const Router = useRouter();
 
  const { location, startDate, endDate, noOfGuests } = Router.query;
  const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formattedStartDate}-${formattedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}guests`} />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+stays-{range}- for {noOfGuests} number of guest
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">cancellation flexibility</p>
            <p className="button">type of place</p>
            <p className="button">price</p>
            <p className="button">rooms and beds</p>
            <p className="button">More filters</p>
          </div>
          {/* render info card */}
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <InfoCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Pagination/>
      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}