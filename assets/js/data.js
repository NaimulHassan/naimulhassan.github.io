/* ------------------------------------------------------------------
   All site content lives here. Edit this file to update the website;
   index.html and paper.html render from it.
   ------------------------------------------------------------------ */
window.SITE = {
  profile: {
    name: "K M Naimul Hassan",
    role: "Ph.D. student in Computer Science and Engineering",
    org: "The Ohio State University",
    photo: "assets/img/headshot.webp",
    bio: [
      "I build models that read the brain while it listens. My work decodes EEG to find out which voice a person is attending to, aligns neural responses with the speech that caused them, and combines EEG with gaze and head motion to make those decoders work outside the lab.",
      "I'm a Graduate Research Associate in the <a href=\"https://the-aspire-group.github.io/\">ASPIRE Group</a>, advised by <a href=\"https://engineering.osu.edu/people/williamson.413\">Prof. Donald S. Williamson</a>. Before OSU, I did my B.Sc. and M.Sc. in Electrical and Electronic Engineering at BUET, working on medical audio and assistive technology."
    ],
    seeking: "Looking for research internships in brain-computer interfaces, neural data science, and applied machine learning.",
    email: "hassan.491@osu.edu",
    cv: "content/Hassan_Resume_26.pdf",
    links: {
      scholar: "https://scholar.google.com/citations?user=ondPg7wAAAAJ&hl=en",
      github: "https://github.com/NaimulHassan",
      linkedin: "https://www.linkedin.com/in/k-m-naimul-hassan/"
    }
  },

  news: [
    { date: "Jun 2026", html: "<b>SCANS</b> was accepted to <i>Interspeech 2026</i>.", paper: "scans", type: "Paper" },
    { date: "May 2026", html: "Submitted <b>MAESTRO</b> to <i>IEEE TASLP</i> and released the dataset on Hugging Face.", paper: "maestro", type: "Dataset" },
    { date: "Apr 2025", html: "Received the <b>CCBS Summer Graduate Research Award</b> from OSU's Center for Cognitive and Brain Sciences.", type: "Award" },
    { date: "Nov 2024", html: "Received the <b>IEEE Signal Processing Society Scholarship</b>.", type: "Award" },
    { date: "Aug 2023", html: "Started my Ph.D. in Computer Science and Engineering at <b>The Ohio State University</b>.", type: "Milestone" },
    { date: "Jul 2023", html: "Defended my M.Sc. thesis on medical sound event detection at BUET and posted <b>ASFNet</b> on TechRxiv.", paper: "asfnet", type: "Milestone" }
  ],

  /* Current research threads shown near the top of the page */
  research: [
    {
      title: "Aligning EEG with speech",
      color: "scarlet",
      text: "Which part of a sentence is the brain responding to right now? SCANS learns a shared space for EEG and speech and sets a new state of the art on the ICASSP 2024 EEG decoding benchmark.",
      paper: "scans"
    },
    {
      title: "Sensing attention beyond EEG",
      color: "teal",
      text: "Listeners look and turn toward the voice they follow. MAESTRO records EEG together with gaze, egocentric video, and head motion, and shows these signals make attention decoding more accurate.",
      paper: "maestro"
    },
    {
      title: "Decoding that knows when it's unsure",
      color: "indigo",
      text: "A belief-state reinforcement learning agent that decodes attention from EEG in real time and tracks its own uncertainty, aimed at neuro-steered hearing aids."
    }
  ],

  publicationGroups: [
    { id: "neuro", label: "Neural decoding and brain-computer interfaces", color: "scarlet" },
    { id: "health", label: "AI for healthcare and accessibility", color: "teal" },
    { id: "audio", label: "Audio and speech processing", color: "indigo" }
  ],

  publications: [
    {
      id: "scans",
      group: "neuro",
      title: "SCANS: Supervised Contrastive Temporal Alignment of Neural Responses and Speech Stimuli",
      authors: ["K M Naimul Hassan", "Donald S. Williamson"],
      venue: "Interspeech 2026",
      venueLong: "Interspeech 2026, Sydney, Australia",
      status: "Published",
      year: 2026,
      thumb: "assets/img/papers/scans_thumb.webp",
      links: {
        paper: "https://www.isca-archive.org/interspeech_2026/hassan26_interspeech.pdf"
      },
      tldr: "Given a snippet of EEG, find the speech segment it is time-locked to. A supervised contrastive model with cross-modal attention does this better than prior methods, especially for people it has never seen.",
      abstract: "Aligning non-invasive neural activity with speech stimuli is a foundational challenge in neural speech decoding. The difficulty lies in mapping noisy, high-dimensional electroencephalography (EEG) signals to the temporal dynamics of speech features. We propose SCANS, a supervised contrastive learning framework for neural-speech temporal alignment. We define this as a classification task where, given an EEG segment and multiple non-overlapping candidate segments from the same speech signal, the model must identify the single matching stimulus temporally aligned with the EEG. SCANS utilizes a dilated convolutional frontend and cross-modal attention to extract and fuse features across modalities. To bridge the modality gap, we employ a multi-task objective combining cross-entropy classification with a contrastive loss. Evaluated on the SParrKULee dataset, SCANS demonstrates significant improvement in neural-speech alignment accuracy.",
      highlights: [
        "New state of the art on the ICASSP 2024 Auditory EEG Decoding Challenge task: 69.3% accuracy on unseen listeners in 5-way matching, up from 62.8%.",
        "Cross-subject variability drops more than threefold (standard deviation 4.6% vs. 14.7% for the previous best model).",
        "Beats the ICASSP 2023 challenge winner on the 2-way task (total score 86.1 vs. 82.1)."
      ],
      figures: [
        { src: "assets/img/papers/scans.webp", caption: "SCANS encodes EEG and the speech envelope with dilated convolutions, lets each stream attend to the other through cross-modal attention, and trains with a supervised contrastive loss plus a match/mismatch classifier." }
      ],
      bibtex: "@inproceedings{hassan26_interspeech,\n  title     = {SCANS: Supervised Contrastive Temporal Alignment of Neural Responses and Speech Stimuli},\n  author    = {Hassan, K M Naimul and Williamson, Donald S.},\n  booktitle = {Proc. Interspeech 2026},\n  pages     = {1218--1222},\n  year      = {2026},\n  doi       = {10.21437/Interspeech.2026-2651}\n}"
    },
    {
      id: "maestro",
      group: "neuro",
      title: "MAESTRO: A Multimodal Auditory-attention Egocentric Speech-TRacking Open corpus",
      authors: ["K M Naimul Hassan*", "Ali Alavi*", "Donald S. Williamson"],
      authorNote: "* Equal contribution",
      venue: "Under review, IEEE TASLP",
      venueLong: "Under review at IEEE Transactions on Audio, Speech, and Language Processing",
      status: "Under review",
      year: 2026,
      thumb: "assets/img/papers/maestro_thumb.webp",
      links: {
        dataset: "https://huggingface.co/datasets/aspireosu/maestro-eeg-dataset",
        code: "https://github.com/ASPIRE-OSU/MAESTRO"
      },
      tldr: "The first auditory attention dataset that records EEG together with gaze, pupil size, egocentric video, and head motion. Adding these behavioral signals to EEG improves attention decoding for almost every listener.",
      abstract: "Humans rely on gaze, head movements, and visual cues to attend to speakers in noisy environments, yet auditory attention decoding (AAD) has been studied primarily using electroencephalography (EEG). We introduce the Multimodal Auditory-attention Ego-centric Speech-TRacking Open (MAESTRO) corpus, the first AAD dataset to simultaneously record EEG, eye gaze, pupillometry, egocentric video, and head inertial measurement unit (IMU) data. MAESTRO includes four competing speakers and background noise across multiple signal-to-noise ratio (SNR) conditions, enabling attention decoding under realistic listening scenarios. Through a four-speaker attention decoding benchmark, we show that combining behavioral and physiological signals improves decoding performance over EEG-only approaches, enabling future advances in multimodal auditory attention decoding.",
      highlights: [
        "16 listeners, 1,600 trials, four competing English speakers plus background noise, attended-speaker SNR from 0 to 18 dB, in a naturally reverberant room.",
        "Participants move their eyes and head freely, so the dataset captures natural listening behavior instead of suppressing it.",
        "Adding gaze, video, and head motion to EEG improves four-speaker decoding at every window size, by up to 13 points, and beats EEG alone in 94% of unseen-subject cases.",
        "The benefit nearly doubles at short 5-second windows, where EEG alone has the least context."
      ],
      figures: [
        { src: "assets/img/papers/maestro_setup.webp", caption: "Four target loudspeakers sit at ±22.5° and ±67.5° in front of the listener; two noise loudspeakers sit behind at ±135°. Participants wear an EEG cap and eye-tracking glasses." },
        { src: "assets/img/papers/maestro_gaze.webp", caption: "One trial from the dataset: egocentric video frames with gaze points overlaid, the gaze trajectory over time, and pupil diameter for both eyes." }
      ],
      bibtex: ""
    },
    {
      id: "sscednet",
      group: "health",
      title: "SS+CEDNet: A Speech Privacy Aware Cough Detection Pipeline by Separating Sources",
      authors: ["K M Naimul Hassan", "Mohammad Ariful Haque"],
      venue: "IEEE R10-HTC 2022",
      venueLong: "IEEE Region 10 Humanitarian Technology Conference (R10-HTC), 2022",
      status: "Published",
      year: 2022,
      thumb: "assets/img/papers/sscednet.webp",
      links: {
        paper: "content/papers/SS+CEDNet.pdf",
        code: "https://github.com/NaimulHassan/SS-CEDNet"
      },
      tldr: "Separate cough from background speech first, then detect coughs on the clean channel. Detection gets more accurate and conversations stay private.",
      abstract: "Cough is one of the most distinguishable symptoms for Influenza-like-illness (ILI) and Severe Acute Respiratory Infection (SARI). Background speech events make it difficult for algorithms to detect cough events, and the performance of the models drops significantly. At the same time, speech privacy is not preserved in traditional cough detection models. We propose a pipeline, SS+CEDNet, consisting of a Source Separation (SS) and a Cough Event Detection (CED) model. The SS model first separates the cough and speech sources, and the separated cough source is then passed through the CED model to detect cough events. The pipeline preserves speech privacy by separating the sources and also shows better cough detection accuracy.",
      highlights: [
        "Cough-detection F1 rises from 87% to 99% with YAMNet, and all four detectors tested improve.",
        "No speech-overlapped audio is thrown away, unlike earlier privacy-preserving approaches that discard those segments.",
        "Wave-U-Net separates the sources at 11.87 dB overall SDR."
      ],
      figures: [
        { src: "assets/img/papers/sscednet.webp", caption: "Mixed audio is split into cough and speech sources; only the cough source is segmented and passed to the cough event detector." }
      ],
      bibtex: "@inproceedings{hassan2022sscednet,\n  title     = {SS+CEDNet: A Speech Privacy Aware Cough Detection Pipeline by Separating Sources},\n  author    = {Hassan, K. M. Naimul and Haque, Mohammad Ariful},\n  booktitle = {2022 IEEE 10th Region 10 Humanitarian Technology Conference (R10-HTC)},\n  pages     = {32--37},\n  year      = {2022},\n  doi       = {10.1109/R10-HTC54060.2022.9929794}\n}"
    },
    {
      id: "alsnet",
      group: "health",
      title: "ALSNet: A Dilated 1-D CNN for Identifying ALS from Raw EMG Signal",
      authors: ["K M Naimul Hassan", "Md. Shamiul Alam Hridoy", "Naima Tasnim", "Atia Faria Chowdhury", "Tanvir Alam Roni", "Sheikh Tabrez", "Arik Subhana", "Celia Shahnaz"],
      venue: "ICASSP 2022",
      venueLong: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2022",
      status: "Published",
      year: 2022,
      thumb: "assets/img/papers/alsnet.webp",
      links: {
        paper: "content/papers/alsnet.pdf",
        code: "https://github.com/NaimulHassan/ALSNet"
      },
      tldr: "A dilated 1-D CNN that identifies ALS directly from raw EMG, with no hand-crafted features.",
      abstract: "Amyotrophic Lateral Sclerosis (ALS) is one of the most common neuromuscular diseases, affecting both lower and upper motor neurons. In this paper, a dilated one-dimensional convolutional neural network, named ALSNet, is proposed for identifying ALS from raw EMG signal. No hand-crafted feature extraction is required; ALSNet takes the raw EMG signal as input and detects EMG signals of ALS subjects, which makes the method more feasible for practical implementation by reducing the computational cost of feature extraction. The performance of ALSNet was evaluated using overall accuracy, sensitivity, specificity, and balanced accuracy and compared with existing methods. The proposed method showed better performance than the other existing methods, with an overall accuracy of 97.74%.",
      highlights: [
        "97.74% overall accuracy, outperforming the existing methods it was compared with.",
        "Works end to end on raw EMG, removing the feature-extraction step."
      ],
      figures: [
        { src: "assets/img/papers/alsnet.webp", caption: "Example segments of normal and ALS EMG signals." }
      ],
      bibtex: "@inproceedings{hassan2022alsnet,\n  title     = {ALSNet: A Dilated 1-D CNN for Identifying ALS from Raw EMG Signal},\n  author    = {Hassan, K. M. Naimul and Hridoy, Md. Shamiul Alam and Tasnim, Naima and Chowdhury, Atia Faria and Roni, Tanvir Alam and Tabrez, Sheikh and Subhana, Arik and Shahnaz, Celia},\n  booktitle = {ICASSP 2022 - 2022 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},\n  pages     = {1181--1185},\n  year      = {2022},\n  doi       = {10.1109/ICASSP43922.2022.9747366}\n}"
    },
    {
      id: "braille",
      group: "health",
      title: "A Dual-Purpose Refreshable Braille Display Based on Real Time Object Detection and Optical Character Recognition",
      authors: ["K M Naimul Hassan", "Subrata Kumar Biswas", "Md Shakil Anwar", "Md Shakhrul Iman Siam", "Celia Shahnaz"],
      venue: "IEEE SPICSCON 2019",
      venueLong: "IEEE International Conference on Signal Processing, Information, Communication & Systems (SPICSCON), 2019",
      status: "Published",
      year: 2019,
      thumb: "assets/img/papers/braille.webp",
      links: {
        paper: "content/papers/braille.pdf",
        code: "https://github.com/NaimulHassan/Dual-Purpose-Refreshable-Braille"
      },
      tldr: "A low-cost assistive device that reads printed text (English and Bengali) and recognizes nearby objects, then shows the result on a refreshable Braille display.",
      abstract: "This paper proposes a dual-purpose braille system for visually impaired people. The system has two main features: object detection and optical character recognition. Real-time object detection helps a visually impaired person know about the things around them, and optical character recognition helps them read characters in both English and Bengali. A pre-trained convolutional neural network (AlexNet) classifies objects, and an OCR engine (Tesseract) with basic image processing performs character recognition. A refreshable braille display is also designed to show the braille characters.",
      highlights: [
        "National champion and world finalist at the IEEE YESIST12 Innovation Challenge 2019."
      ],
      figures: [
        { src: "assets/img/papers/braille.webp", caption: "The refreshable Braille display prototype." }
      ],
      bibtex: "@inproceedings{hassan2019braille,\n  title     = {A Dual-Purpose Refreshable Braille Display Based on Real Time Object Detection and Optical Character Recognition},\n  author    = {Hassan, K. M. Naimul and Biswas, Subrata Kumar and Anwar, Md Shakil and Siam, Md Shakhrul Iman and Shahnaz, Celia},\n  booktitle = {2019 IEEE International Conference on Signal Processing, Information, Communication \\& Systems (SPICSCON)},\n  pages     = {78--81},\n  year      = {2019},\n  doi       = {10.1109/SPICSCON48833.2019.9065110}\n}"
    },
    {
      id: "asfnet",
      group: "audio",
      title: "ASFNet: Audio Spectrogram Fourier Network for Efficient Medical Sound Event Detection",
      authors: ["K M Naimul Hassan", "Mohammad Ariful Haque"],
      venue: "Preprint, TechRxiv 2023",
      venueLong: "Preprint, TechRxiv, 2023",
      status: "Preprint",
      year: 2023,
      thumb: "assets/img/papers/asfnet_thumb.webp",
      links: {
        paper: "https://doi.org/10.36227/techrxiv.23732205.v1"
      },
      tldr: "Swap the attention in an audio transformer for a Fourier transform. The model gets more accurate on scarce medical audio and smaller at the same time.",
      abstract: "Sound event detection (SED) in the medical environment can help with many healthcare tasks. Transformer encoders are a promising choice, but two difficulties stand in the way: medical audio data is extremely limited, making it hard to train a transformer effectively, and SED models need to be computationally efficient for resource-limited medical settings, while attention is computationally expensive. We introduce the Audio Spectrogram Fourier Network (ASFNet), an attention-free transformer encoder for sound event detection in medical environments that replaces the attention operation with a simplified Fast Fourier Transform. ASFNet outperforms other methods, achieving an average mAP of 0.474 with a 16.76% relative improvement, with fewer model parameters and a smaller model size.",
      highlights: [
        "0.473 mAP vs. 0.401 for the Audio Spectrogram Transformer (18% relative) with 36% fewer parameters (56M vs. 87M).",
        "Even the 3M-parameter ASFNet-Tiny beats the full 87M-parameter AST."
      ],
      figures: [
        { src: "assets/img/papers/asfnet.webp", caption: "Average mAP, parameter count, and model size for AST and ASFNet variants." }
      ],
      bibtex: "@misc{hassan2023asfnet,\n  title     = {ASFNet: Audio Spectrogram Fourier Network for Efficient Medical Sound Event Detection},\n  author    = {Hassan, K. M. Naimul and Haque, Mohammad Ariful},\n  year      = {2023},\n  publisher = {TechRxiv},\n  doi       = {10.36227/techrxiv.23732205.v1}\n}"
    },
    {
      id: "doanet",
      group: "audio",
      title: "DOANet: A Deep Dilated Convolutional Neural Network Approach for Search and Rescue with Drone-Embedded Sound Source Localization",
      authors: ["Alif Bin Abdul Qayyum", "K M Naimul Hassan", "Adrita Anika", "Md. Farhan Shadiq", "Md Mushfiqur Rahman", "Md. Tariqul Islam", "Sheikh Asif Imran", "Shahruk Hossain", "Mohammad Ariful Haque"],
      venue: "EURASIP JASMP 2020",
      venueLong: "EURASIP Journal on Audio, Speech, and Music Processing, 2020",
      status: "Published",
      year: 2020,
      thumb: "assets/img/papers/doanet.webp",
      links: {
        paper: "content/papers/doanet-ssl.pdf",
        code: "https://github.com/NaimulHassan/DOANet"
      },
      tldr: "Locate a person calling for help from a drone's microphone array, despite loud rotor noise, with an end-to-end dilated CNN.",
      abstract: "Drone-embedded sound source localization (SSL) is promising for search and rescue, where bad lighting or occlusions limit cameras, but severe drone ego-noise can push the recorded signal-to-noise ratio below zero. Using recordings from an 8-channel cube-shaped microphone array on an unmanned aerial vehicle, we compare angular-spectrum TDOA methods (GCC-PHAT, MVDR), improve them with speed-correlated harmonics cancellation, and propose DOANet, an end-to-end one-dimensional dilated CNN that estimates the azimuth and elevation of the target source directly from raw audio, without hand-crafted features or ego-noise reduction. DOANet shows promising results compared with the angular spectrum methods with and without noise cancellation. We also introduce the area under the cumulative histogram of angular deviations as a performance indicator for this problem.",
      highlights: [
        "Estimates azimuth and elevation directly from raw 8-channel audio.",
        "Grew out of the IEEE Signal Processing Cup 2019 (world rank 10)."
      ],
      figures: [
        { src: "assets/img/papers/doanet.webp", caption: "Drone-embedded sound source localization for search and rescue." }
      ],
      bibtex: "@article{qayyum2020doanet,\n  title   = {DOANet: a deep dilated convolutional neural network approach for search and rescue with drone-embedded sound source localization},\n  author  = {Qayyum, Alif Bin Abdul and Hassan, K. M. Naimul and Anika, Adrita and Shadiq, Md. Farhan and Rahman, Md Mushfiqur and Islam, Md. Tariqul and Imran, Sheikh Asif and Hossain, Shahruk and Haque, Mohammad Ariful},\n  journal = {EURASIP Journal on Audio, Speech, and Music Processing},\n  volume  = {2020},\n  number  = {16},\n  year    = {2020},\n  doi     = {10.1186/s13636-020-00184-2}\n}"
    },
    {
      id: "gsc",
      group: "audio",
      title: "Direction of Arrival Estimation through Noise Suppression: A Novel Approach using GSC Beamforming and Room Acoustic Simulation",
      authors: ["Alif Bin Abdul Qayyum", "Adrita Anika", "Md. Messal Monem Miah", "Md. Mushfiqur Rahman", "K M Naimul Hassan", "Md. Tariqul Islam", "Sheikh Asif Imran Shouborno", "Md. Farhan Shadiq", "Mohammad Ariful Haque"],
      venue: "IEEE SPICSCON 2019",
      venueLong: "IEEE International Conference on Signal Processing, Information, Communication & Systems (SPICSCON), 2019",
      status: "Published",
      year: 2019,
      thumb: "assets/img/papers/gsc.webp",
      links: {
        paper: "content/papers/gsc-beamform.pdf"
      },
      tldr: "Estimate rotor noise with a beamformer, simulate it, and filter it out before localizing speech from a hovering drone.",
      abstract: "We propose a method for estimating the direction of a sound source from speech mixed with different levels of noise, recorded by a microphone array embedded in an unmanned aerial vehicle (UAV), using the DREGON dataset (IEEE Signal Processing Cup 2019, static task). A Generalized Sidelobe Canceller (GSC) beamformer extracts the noise along the rotor directions; this noise is simulated to synthesize 8-channel audio with pyroomacoustics and used as the reference for a Wiener filter that removes noise from the recordings. GCC-PHAT and GCC-NONLIN then estimate the elevation and azimuth of the source. The method localizes human speech from recordings with SNR as low as −20 dB; allowing at most 10° of angular error, it reaches an accuracy of almost 91.67%.",
      highlights: [
        "Localizes speech at SNRs as low as −20 dB.",
        "Almost 91.67% accuracy within 10° of angular error."
      ],
      figures: [
        { src: "assets/img/papers/gsc.webp", caption: "Microphone array geometry on the UAV." }
      ],
      bibtex: "@inproceedings{qayyum2019gsc,\n  title     = {Direction of Arrival Estimation through Noise Suppression: A Novel Approach using GSC Beamforming and Room Acoustic Simulation},\n  author    = {Qayyum, Alif Bin Abdul and Anika, Adrita and Miah, Md. Messal Monem and Rahman, Md. Mushfiqur and Hassan, K. M. Naimul and Islam, Md. Tariqul and Shouborno, Sheikh Asif Imran and Shadiq, Md. Farhan and Haque, Mohammad Ariful},\n  booktitle = {2019 IEEE International Conference on Signal Processing, Information, Communication \\& Systems (SPICSCON)},\n  pages     = {104--108},\n  year      = {2019},\n  doi       = {10.1109/SPICSCON48833.2019.9065151}\n}"
    }
  ],

  experience: [
    {
      role: "Graduate Research Associate",
      org: "The Ohio State University, ASPIRE Group",
      place: "Columbus, Ohio",
      dates: "Aug 2023 – Present",
      points: [
        "Temporal alignment of EEG and speech (SCANS, Interspeech 2026).",
        "Multimodal auditory attention decoding with EEG, gaze, video, and head motion (MAESTRO).",
        "Belief-state reinforcement learning for real-time attention decoding in neuro-steered hearing aids."
      ]
    },
    {
      role: "Research Assistant",
      org: "Bangladesh University of Engineering and Technology",
      place: "Dhaka, Bangladesh",
      dates: "Jul 2021 – Jul 2023",
      points: [
        "Privacy-preserving cough detection with source separation (SS+CEDNet).",
        "Attention-free transformer for medical sound event detection (ASFNet)."
      ]
    }
  ],

  education: [
    { degree: "Ph.D., Computer Science and Engineering", org: "The Ohio State University", dates: "Aug 2023 – Present" },
    { degree: "M.Sc., Electrical and Electronic Engineering", org: "Bangladesh University of Engineering and Technology", dates: "Jul 2021 – Jul 2023", note: "Thesis: Medical Sound Event Detection Using Audio Spectrogram Fourier Network" },
    { degree: "B.Sc., Electrical and Electronic Engineering", org: "Bangladesh University of Engineering and Technology", dates: "Feb 2016 – Feb 2021" }
  ],

  /* Newest first */
  projects: [
    { title: "Social Conversational Agent", venue: "Amazon Alexa Prize SocialBot Grand Challenge 2022", text: "Designed a chatbot for open-ended conversation, with modules for understanding intent, managing dialog, and generating responses.", img: "assets/img/projects/chatbot.svg" },
    { title: "Synthetic Speech Attribution", venue: "IEEE SP Cup 2022", result: "Team mentor", text: "Mentored a team building a model that identifies which speech-synthesis system generated an audio clip.", img: "assets/img/projects/synthetic-speech.svg" },
    { title: "Anomaly Detection in Autonomous Systems", venue: "IEEE SP Cup 2020", result: "Second runner-up", text: "Flagged abnormal behavior from motion-sensor and video data without labeled examples, using autoencoders.", img: "assets/img/projects/anomaly-drone.webp", report: "content/papers/sp2020.pdf" },
    { title: "Privacy-Protected Activity Recognition", venue: "IEEE VIP Cup 2019", result: "First runner-up", text: "Recognized office activities from body-camera video while blurring sensitive objects.", img: "assets/img/projects/activity-bodycam.webp", report: "content/papers/vip2019.pdf" },
    { title: "Drone-Based Sound Source Localization", venue: "IEEE SP Cup 2019", result: "World rank 10", text: "Estimated the direction of a sound source from a drone's microphone array in noise, for search and rescue.", img: "assets/img/papers/doanet.webp", paper: "doanet" },
    { title: "Refreshable Braille Display", venue: "IEEE YESIST12 2019", result: "National champion, world finalist", text: "A portable device that reads text and detects objects for visually impaired users, with output on a Braille display.", img: "assets/img/papers/braille.webp", paper: "braille" }
  ],

  awards: [
    { title: "CCBS Summer Graduate Research Award", org: "Center for Cognitive and Brain Sciences, OSU", year: "2025" },
    { title: "IEEE Signal Processing Society Scholarship", org: "IEEE Signal Processing Society", year: "2024" },
    { title: "CSE Scarlet and Gray Award", org: "Computer Science and Engineering, OSU", year: "2023 – Present" },
    { title: "Post-graduate Fellowship", org: "BUET", year: "2021 – 2023" },
    { title: "Second runner-up, IEEE Signal Processing Cup", org: "ICASSP 2020", year: "2020" },
    { title: "First runner-up, IEEE Video and Image Processing Cup", org: "ICIP 2019", year: "2019" },
    { title: "National champion and world finalist, IEEE YESIST12 Innovation Challenge", org: "IEEE", year: "2019" },
    { title: "World rank 10, IEEE Signal Processing Cup", org: "ICASSP 2019", year: "2019" }
  ]
};
