import { useRouter } from "next/router";

export default function Post() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <div className="container mx-auto">
            <p>This is a post - {id}</p>
        </div>
    );
}
