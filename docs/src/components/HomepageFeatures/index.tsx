import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Driven by recipes',
    Svg: require('@site/static/img/recipe.svg').default,
    description: (
      <>
        Write your own powerful recipes to automate your writing workflow.
      </>
    ),
  },
  {
    title: 'Powered by data',
    Svg: require('@site/static/img/data.svg').default,
    description: (
      <>
        Configure your own recipe options, and expand with data.
      </>
    ),
  },
  {
    title: 'Executed with ease',
    Svg: require('@site/static/img/execute.svg').default,
    description: (
      <>
        Execute your recipes with a single command, and watch the magic happen.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
