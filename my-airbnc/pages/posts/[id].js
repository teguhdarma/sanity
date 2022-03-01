import Layout from "../../components/layout";

export default function Post({ postData }) {
  return (
    <Layout>
      <h1>{ postData.title }</h1>
      <p>{ postData.body }</p>
    </Layout>
  );
}

async function getAllPostIds(context) {
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

  const allPostIds = select.map((post) => {
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
    const location = context.query.location
  const url = "https://travel-advisor.p.rapidapi.com/locations/search?query="+location+`&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US=${id}`
  const select = await fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "travel-advisor.p.rapidapi.com",
		"x-rapidapi-key": "08f6102a57msh5971be4c6402572p1e116ejsn5966a16c4d29"
	}
}).then(
    (res) => res.json()
  );

  const postData = select.map((post) => {
    return { params: { id: post.alias } };
  });

  return postData;
}


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData: postData[0],
    },
  };
}