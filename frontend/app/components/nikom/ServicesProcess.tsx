import { StreamText } from '@/app/components/nikom/animations';
import { dataAttr } from '@/sanity/lib/utils';

type ProcessStep = {
  _key?: string;
  n?: string;
  title?: string;
  desc?: string;
};

type Props = {
  block: {
    _key?: string;
    eyebrow?: string;
    heading?: string;
    lead?: string;
    steps?: ProcessStep[];
  };
  index: number;
  pageId: string;
  pageType: string;
};

export default function ServicesProcess({ block, pageId, pageType }: Props) {
  const key = block?._key ?? '';
  const path = (field: string) => `pageBuilder[_key=="${key}"].${field}`;

  const eyebrow = block?.eyebrow;
  const heading = block?.heading;
  const lead = block?.lead;
  const steps = block?.steps ?? [];

  return (
    <section className="section-pad services-process">
      <div className="container">
        <div className="section-head">
          <div className="left">
            <div
              className="eyebrow"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('eyebrow') }).toString()}
            >
              {eyebrow}
            </div>
            <h2
              className="h2"
              data-sanity={dataAttr({ id: pageId, type: pageType, path: path('heading') }).toString()}
            >
              <StreamText text={heading} />
            </h2>
          </div>
          <p
            className="section-lead"
            data-sanity={dataAttr({ id: pageId, type: pageType, path: path('lead') }).toString()}
          >
            {lead}
          </p>
        </div>
        <div
          className="srv-process-rail"
          data-sanity={dataAttr({ id: pageId, type: pageType, path: path('steps') }).toString()}
        >
          {steps.map((step) => (
            <div
              className="rail-step"
              key={step._key}
              data-sanity={dataAttr({
                id: pageId,
                type: pageType,
                path: path(`steps[_key=="${step._key}"]`),
              }).toString()}
            >
              <div className="rail-num">{step.n ?? ''}</div>
              <div className="rail-line" />
              <div className="rail-body">
                <h4 className="h4">{step.title ?? ''}</h4>
                <p dangerouslySetInnerHTML={{ __html: step.desc ?? '' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
