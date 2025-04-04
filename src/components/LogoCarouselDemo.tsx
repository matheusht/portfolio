import { LogoCarousel } from './ui/logo-carousel';
import { 
  CompTIAIcon, 
  OffSecIcon, 
  HackTheBoxIcon,
  CiscoIcon,
  ISC2Icon,
  ECCouncilIcon
} from './ui/logo-icons';

const allLogos = [
  { name: "CompTIA", id: 1, img: CompTIAIcon },
  { name: "Offensive Security", id: 2, img: OffSecIcon },
  { name: "Hack The Box", id: 3, img: HackTheBoxIcon },
  { name: "Cisco", id: 4, img: CiscoIcon },
  { name: "(ISC)²", id: 5, img: ISC2Icon },
  { name: "EC-Council", id: 6, img: ECCouncilIcon },
];

export function LogoCarouselDemo() {
  return (
    <section className="py-20 bg-[#0A192F]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Trusted By</h2>
        <div className="flex justify-center">
          <LogoCarousel columnCount={3} logos={allLogos} />
        </div>
      </div>
    </section>
  );
}