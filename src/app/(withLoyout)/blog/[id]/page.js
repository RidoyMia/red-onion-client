import BlogDetails from "../../../../components/BlogDetails/BlogDetails";



const page = ({params}) => {
    return (
        <div>
            <BlogDetails id={params.id}></BlogDetails>
        </div>
    );
};

export default page;