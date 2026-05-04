import Image from "../../../../@ui/Image";

type Props = {
  name: string;
  masterWorks: string[];
};

const MasterWorks = ({ name, masterWorks }: Props) => {
  return (
    <section className="master-section">
      <h3>Robory mistrza</h3>
      <div className="mobile:grid-cols-4 grid grid-cols-2 gap-6">
        {masterWorks.map((image, i) => (
          <div key={image} className="aspect-square overflow-hidden rounded-xl">
            <Image src={image} alt={`Master ${name} photo ${i}`} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MasterWorks;
