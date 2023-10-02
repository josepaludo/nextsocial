import ButtonLink from "@/components/general/ButtonLink";
import LargeHeader from "@/components/general/LargeHeader";
import Posts from "@/components/server/post/Posts";

export default async function Home() {


  return <>
    <div className="flex flex-wrap items-center my-3">
      <LargeHeader
        content="Login or register:"
        className=" me-3"
      />
      <div className="flex my-3">
        <ButtonLink
          href="/login"
          title="Login"
          className="me-3"
        />
        <ButtonLink
          href="/register"
          title="Register"
        />
      </div>
    </div>
    <Posts />
  </>
}
