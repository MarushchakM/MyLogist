import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { trucksPath } from "@/paths";

export default function NotFound() {
  return (
    <Container title="Авто не найдено">
      <Button href={trucksPath()} variant="secondary">
        Повернутись до списку
      </Button>
    </Container>
  );
}
