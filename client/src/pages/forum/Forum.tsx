import AppLink from "@/components/ui/button.link";
import { Url } from "@/url/Url";

export default function ForumPage() {
  return (
    <section className="flex flex-wrap w-full md:max-w-1/3 place-self-center page">
      <AppLink href={Url.forum.create}>Create Post</AppLink>
    </section>
  );
}
