import Image from "../../../../@ui/Image";

type Props = {
  name: string;
  photo: string;
  description: string[];
};

const MasterInfo = ({ name, photo, description }: Props) => {
  return (
    <section className="master-section">
      <h3>O mistrzu</h3>
      <section className="tablet:grid-cols-[400px_1fr] mobile:grid-cols-[2fr_3fr] grid grid-cols-1 gap-4">
        <div className="aspect-square overflow-hidden rounded-2xl">
          <Image src={photo} alt={name} />
        </div>
        <article className="space-y-1">
          {description.map((pr, i) => (
            <p
              data-testid="master-desc"
              key={i}
              className="first-letter:font-bold"
            >
              {pr}
            </p>
          ))}
        </article>
      </section>
    </section>
  );
};

export default MasterInfo;
