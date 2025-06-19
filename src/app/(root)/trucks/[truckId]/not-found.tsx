import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { trucksPath } from "@/paths";

export default function NotFound() {
  return (
    <Container>
      <h2>Авто не найдено</h2>
      <Button href={trucksPath()} variant="secondary">
        Повернутись до списку
      </Button>
    </Container>
  );
}
