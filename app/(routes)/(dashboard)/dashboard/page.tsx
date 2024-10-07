import { SignOutButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div>
      DashboardPage
      <hr />
      <SignOutButton>
        <button>Salir de la sesion</button>
      </SignOutButton>
    </div>
  );
}
