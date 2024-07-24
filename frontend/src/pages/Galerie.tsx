import { BodyBlock } from "../components/common/bodyBlock";
import { Gallery } from "../components/specific/gallery";

export function Galerie() {
    return (
        <div className="page">
            <BodyBlock color="secondary">
                <Gallery></Gallery>
            </BodyBlock>
        </div>
    );

}
