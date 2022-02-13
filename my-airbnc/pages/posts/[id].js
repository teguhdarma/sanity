import Image from "next/image";
import { HeartIcon, StarIcon } from "@heroicons/react/solid";
import App from "../../components/Map";

export default function Post({ postData, select }) {
  return (

    <div>
      <h1 className="text-xl">{postData.title}</h1>
      <div>
        <ul>
          {select.data.map((document) => (
            <li key={document.data}>
              <div className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t ">
                <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 hover:scale-105 transform transition duration-300 ease-out">
                  <Image
                    src={document.result_object.photo.images.original.url}
                    layout="fill"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col flex-grow pl-5">
                  <div className="flex justify-between">
                    <p>{document.result_object.address}</p>
                    <HeartIcon className="h-7 cursor-pointer text-red-500" />
                  </div>
                  <h4 className="text-xl">{document.result_object.name}</h4>
                  <div className="border-b w-10 py-2" />
                  <p className="pt-2 text-sm text-zinc-500">
                    {document.result_object.category.name}
                  </p>
                  <div className="flex justify-between items-end pt-5">
                    <p className="flex items-center">
                      <StarIcon className="h-5 text-red-400" />
                      {document.result_object.rating}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <section className="hidden xl:inline-flex xl:min-w-[600px]">
            <App/>
        </section>
    </div>
    
  );
}

async function getAllPostIds() {
  const apiUrl = "http://localhost:3004/posts";

  const response = await fetch(apiUrl);

  const allPosts = await response.json();

  const allPostIds = allPosts.map((post) => {
    return { params: { id: post.alias } };
  });

  return allPostIds;
}

export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

async function getPostData(id) {
  const apiURL = `http://localhost:3004/posts?alias=${id}`;

  const response = await fetch(apiURL);

  const postData = await response.json();

  return postData;
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const select = await
  fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=bali&limit=1&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
		"x-rapidapi-key": "1986c8e022msh1534cf98bff4ec1p19e90djsn31884e72df1c"
	}
}).then((res) => res.json());
  return {
    props: {
      postData: postData[0],
      select,
    },
  };
}
