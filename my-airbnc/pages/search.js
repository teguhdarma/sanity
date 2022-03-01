import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import format from "date-fns/format";
import InfoCard from "../components/InfoCard";
import Pagination from "../components/Pagination";
import App from "../components/Map";



function search({ select,map }) {
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
          <div>
          {select.data.map(item => (
              <InfoCard
                key={item.id}
                id={item.location_id}
                img={item.result_object.photo.images.medium.url}
                title={item.result_object.name}
                location={item.result_object.address}
                star={item.result_object.rating}
              />
            ))}
      </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
           <App select={select}/>
        </section>
       
      </main>
      <Pagination/>
      <Footer />
    </div>
  );
}

export default search;

export async function getServerSideProps(context) {
const location = context.query.location
  const url = "https://travel-advisor.p.rapidapi.com/locations/search?query="+location+"&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US"
  const select = await fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
		"x-rapidapi-key": "08f6102a57msh5971be4c6402572p1e116ejsn5966a16c4d29"
	}
}).then(
    (res) => res.json()
  );
  const map = await fetch ("https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoidGVndWhkYXJtYSIsImEiOiJja3psNjRneWsxNHQ1Mm5ueXh2dThpY2xuIn0.EOP9mO-H8NKTAW6jcvX7KQ").then(
    (res) => res.json()
  );
  return {
    props: {
      select,
      map
    },
  };
}
