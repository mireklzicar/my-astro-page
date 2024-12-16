---
title: "What Can Neural Network Embeddings Do That Fingerprints Can’t?"
summary: "Fingerprints have long been the standard for representing molecules, but neural network embeddings are opening doors to new possibilities. This post explores where these AI-driven representations excel, from better capturing molecular similarity with metrics to addressing modalities that traditional fingerprints often miss."
date: "Nov 13 2024"
draft: true
tags:
- Blog
- Info
---

# What Can Neural Network Embeddings Do That Fingerprints Can’t?

Molecular fingerprints, like Extended-Connectivity Fingerprints (ECFP), are widely used because they are simple, interpretable, and efficient, encoding molecules into fixed-length bit vectors based on predefined structural features. In contrast, neural network embeddings are dense, high-dimensional vectors learned directly from data using models like GraphConv, Chemprop, MolBERT, ChemBERTa, MolGPT, and Graphformer. These models, trained on millions of drug-like molecules represented as SMILES, graphs, or 3D point clouds, capture continuous and context-dependent molecular features, enabling tasks such as property prediction, molecular similarity, and generative design. The rise of neural network-based representations has raised an important question: Do AI embeddings offer advantages over the tried-and-tested fingerprint approach?

## The Performance Paradox

Here’s the catch: in many standard predictive tasks, neural network embeddings don’t necessarily outperform fingerprints. Benchmarks on [TDC (Therapeutic Data Commons)](https://tdcommons.ai/) ranging from Bioavalibility to Lipophicility, hERG toxicity or half life shown clearly (as depicted on the pie chart below) that most of the SOTA models use "old-school" gradient-boosted trees (such as Random Forest or XGBoost) with fingerprints. SOTA prediction accuracy is achieved alone by Graph Neural Networks (GNNs) or Transformers only on 1/4 datasets.

> If Neural Network or Transformer Models are so much larger and computationally powerful while not outperforming fingerprints in simple prediction tasks, what are their advantages?

![](tdc_pie.png)
*A pie chart showing SOTA results on TDC ADMET benchmark, what kind of model attained the best performance and what features they used.*

## Embeddings as "Inceptions"

To understand what should we expect from neural features, it is fruithful to remind oneself why in other fields neural representations overcome traditional ones. Computer vision is a compelling example: In image recognition tasks Convolutional Neural Networks became far superior to handcrafted features based on shape matching or later by fourier or wavelet coefficients.

![](cnn_features.png)

*A depiction of feature maps in Convolutional Neural Network ranging from low level to high level features with increasing level of abstraction*

This is because the rules to capture all possible image modalities were impossible to formulate apriori and a neural network can learn it (as humans do) automatically from the domain it is trained on. Think of a problem of recognition an arbitrary image of a cat: it is almost imposible to come up with equations and preconceived features to fit an accurate model for it.

## Neural Networks are superior on unstructured data

Whereas traditional algorithms shine on structured data, on unstructured data they were too rigid to capture all the modalities: neural networks learned them in a humanly way. Neural Embeddings are superior in domains of "unstructured" or "qualitative" data (images, audio, natural languages) as opposed to "structured" or quantitative data. 

Yet in chemistry, some modalities are fairly structured (2D Molecular Graphs, SMILES) and **on structured modalities (and especially on small datasets), there is no reason why should neural networks be substantially better** than traditional Boosted Trees on binary Fingerprints – this is the phenomenon we can see in the TDC Benchmark.

However, on continuous and unstructured data (and especially on large datasets), there are many applications, where coming up with exact equations or simulations is too complicated or computationally expensive and neural networks have a high potential to learn from existing data not yet discovered patterns. **Such modalities are for instance learning from 3D Shape or Electrostatics and capturing complex phenomenons such as protein folding, conformer generation, prediction of partial charges or docking.** In some of these areas we have nobel-prize winning science (protein folding) in others there is a huge progress awaiting ahead with the main temporary bottleneck being size of the datasets and quality of benchmark splits to avoid overfitting.

![](alphafold.png)
*A figure with Alphafold success in CASP visible on a bar graph (left) and example of protein tertiary structure predictions by it  closely matching experimental results.*

## Inception Distance

If neural embeddings act as "Inceptions", then the distance (or distribution shift) between them will be an "Inception Distance". Again coming from computer vision, *Fréchet Inception Distance (FID)* based on embeddings from a CNN called Inception is used to assess real-ness of generated images. While comparing images pixel by pixel would fail in cases where image is very similar, but slightly shifted or rotated, FID is suprisingly general and detects semantic similarity (or dissimilarity) of images accuratelly.

![](inception_distorsion.png)
*Figure showing various deformations of an image (noise, blur, mask, vortex, salt and pepper or collage) and corresponding increase in Fréchet Inception Distance.*

The *Fréchet ChemNet Distance (FCD)* applies this idea to molecular space. FCD compares distributions of molecules using activations of a pre-trained neural network. In a figure below you can see how it distinguishes real molecules from those of a generative models. While it would be hard to pinpoint exactly which features make a molecule druglike (and no set of rules including Lipinsky's rule of five is an exception), we can train a neural network on a database of drug-like molecules and then estimate the distance telling us how in-distribution they are in a high dimensional latent space.

$${\displaystyle d^{2}=|\mu _{X}-\mu _{Y}|^{2}+\operatorname {tr} (\Sigma _{X}+\Sigma _{Y}-2(\Sigma _{X}\Sigma _{Y})^{1/2})}$$

![](frechet_distance.jpg)
*Graphical Abstract showing distributions of reference database molecules vs molecules by generative models. Valid, yet unplausible or undruglike molecules will have higher FCD from the reference database (in this case Chembl, PubChem or ZINC).*

## CHEESE Chemical Embeddings

CHEESE (Chemical Embeddings Search Engine) calculates distance of neural embeddings to retrieve the most similar molecules which are both relevant to the query and 3D Shape or Electrostatically similar to it. While any trained neural network will learn a property of representing similar inputs in embeddings close to each other in high dimensional latent space, this alone doesn't guarantee that "inceptionally" similar molecules will be good candidates in a virtual screening. For that we need to go one step further and adjust the loss function to incentivise chemically relevant molecules - this is done by optimizing for 3D shape and electrostatic similarity of ensembles.

Traditional fingerprints often fail when molecular similarity depends on 3D conformation rather than substructural patterns. Neural networks, especially those incorporating 3D information (e.g., SchNet), excel here. These models naturally account for spatial relationships, enabling more accurate comparisons of molecular shapes.


![](cheese_ensembles.png)
*A diagram of CHEESE architecture*

In constrast to fingerprints, CHEESE embeddings can really learn better what a 3D Shape similar molecule is. Here is an example on a chembl database with shape similarity search of a small heterocyclic molecule.

![](shape_cheese.png)

In the figure above we see more shape-similar molecules retrieved by CHEESE than in a figure below with molecules retrieved by Morgan fingerprints. Molecules retrieved by fingerprints are often of entirely different scaffold, number of rings or molecular weight.

![](shape_fingerprints.png)


## Beyond ones and zeros

Since embeddings are continuous vectors, they can learn more subtle qualitative comparisons between molecules. This is best visible when comparing electrostatic similarity of fragments.

![](electrostatics_matrices.png)
*Figure with two matrices, fingerprints on the left and cheese embeddings on the right. The coloring represents a value of tanimoto similarity in case of fingerprints and cosine similarity in case of CHEESE embeddings.*

## Smooth Latent Spaces: A Key Advantage

One major advantage of neural embeddings is the creation of euclidean latent spaces, where similar molecules cluster together naturally. This continuity enables:
1.	Improved Molecular Generation: A smoother latent space means generated molecules are more realistic and chemically plausible.
2.	Enhanced Transfer Learning: Neural embeddings generalize better to new tasks with limited data, leveraging patterns learned in related contexts.
3.	Natural Similarity Measures: Unlike fingerprints, embeddings encode similarities in a continuous space, making them more robust for nuanced comparisons.

![](explorer.avif)


## Conclusion: Choosing the Right Tool



## References

1. Rogers, D., & Hahn, M. (2010). Extended-connectivity fingerprints. Journal of Chemical Information and Modeling, 50(5), 742-754.

2. Gilmer, J., Schoenholz, S. S., Riley, P. F., Vinyals, O., & Dahl, G. E. (2017). Neural message passing for quantum chemistry. arXiv preprint arXiv:1704.01212.

3. Veličković, P., Cucurull, G., Casanova, A., Romero, A., Lio, P., & Bengio, Y. (2018). Graph attention networks. ICLR 2018.

4. Yang, K., Swanson, K., Jin, W., Coley, C., Eiden, P., Gao, H., ... & Barzilay, R. (2019). Analyzing learned molecular representations for property prediction. Journal of Chemical Information and Modeling, 59(8), 3370-3388.

5. Szegedy, C., Vanhoucke, V., Ioffe, S., Shlens, J., & Wojna, Z. (2015). Rethinking the inception architecture for computer vision. arXiv preprint arXiv:1512.00567.

6. Preuer, K., Renz, P., Unterthiner, T., Hochreiter, S., & Klambauer, G. (2018). Fréchet ChemNet distance: A metric for generative models for molecules in drug discovery. Journal of Chemical Information and Modeling, 58(9), 1736-1741.

7. Schütt, K. T., Kindermans, P. J., Sauceda, H. E., Chmiela, S., Tkatchenko, A., & Müller, K. R. (2017). SchNet: A continuous-filter convolutional neural network for modeling quantum interactions. arXiv preprint arXiv:1706.08566.

8. Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A simple framework for contrastive learning of visual representations. International Conference on Machine Learning.

