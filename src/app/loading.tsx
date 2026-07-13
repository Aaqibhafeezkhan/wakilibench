import { Loading } from "../../components/loading";

export default function RootLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--wb-green-3)]">
      <Loading />
    </main>
  );
}
