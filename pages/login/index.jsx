import Login from "@/components/login";
import { createClient } from "@/lib/supabase/server-props";

export async function getServerSideProps(context) {
  const supabase = createClient(context);

  const { error } = await supabase.auth.getUser();

  if (error) {
    return {
      props: {},
    };
  }

  return {
    redirect: {
      destination: "/quiz",
      permanent: false,
    },
  };
}

export default function LoginPage() {
  return <Login />;
}
