---
title: "TranqAuricle"
category: "Health & Safety"
status: "Completed"
year: 2020
summary: "A novel, portable and non-invasive device that detects anxiety, records its frequency and calms the brain through the auricle."
problem: "Anxiety disorders affect millions in India each year but remain under-recognised compared to other conditions. Current medications act on large areas of the brain and can cause unwanted side effects, and many patients find it uncomfortable to open up about personal struggles in cognitive behavioural therapy."
objective: "Build a low-cost, wearable device that detects anxiety through heart rate and skin temperature, calms the brain through a cooling menthol-gel stimulus at the ear, and records the frequency of panic attacks for future reference, without medication or a therapist's involvement."
workingMechanism: "The device is worn on the ear so a pulse sensor sits at the ear tip, directly above the veins, alongside an LM35 temperature sensor. Both feed analog readings to an Arduino Nano, which watches for fluctuations in heart rate and skin temperature that signal anxiety. When detected, the microcontroller drives a motor that vibrates a menthol gel sachet against the ear lobe, producing a cooling, relaxing effect. This dampens nerve impulses travelling to the emotional centres of the brain and lets the impulses reach the cerebral cortex instead, where rational thought takes over from anxious feeling. The device also logs how often panic attacks occur, for later review."
team:
  - "Santrupti Behera"
# Add remaining teammates: the synopsis refers to "we" throughout but names only appear in the acknowledgements as advisors, not team members.
# Add the mentor's name if you want it shown, e.g.  mentor: "Name"
technologies:
  - "Arduino Nano microcontroller"
  - "Pulse sensor (heart rate)"
  - "LM35 temperature sensor"
  - "Vibrating motor and motor driver"

materials:
  - "Menthol gel sachet (menthol crystals and propylene glycol)"
  - "Ear-mounted housing"
  - "Motor driver circuit"
# ADD IMAGES: remove the # at the start of the lines below after saving the files.
cover:
  src: "/images/projects/tranqauricle.jpeg"
  alt: "TranqAuricle ear-worn anxiety detection and relief device"
  caption: "The TranqAuricle prototype."
teamPhoto:
  - src: "/images/projects/pic-santrupti.jpeg"
    alt: "Portrait of Santrupti Behera"
    caption: "Santrupti Behera"
reportPdf: "/reports/tranqauricle.pdf"
featured: false
publishStatus: published
---

Anxiety is among the most common mental health conditions in India, with an estimated 10 million cases reported each year, yet it receives less recognition than other major disorders. Left unaddressed, it contributes to lower productivity, higher suicide rates, and increased reliance on alcohol, antidepressants and sedatives.

TranqAuricle targets the ear as an access point to the nervous system, since it is rich in nerve endings connected to the brain and heart. By combining dual detection (pulse and temperature) with a calming menthol-vibration response in a single wearable, the device avoids the side effects of neurostimulation therapies and the cost of clinical setups, while also giving users a private way to manage anxiety without needing to describe their symptoms to another person.

The team surveyed 35 residents of Cosmopolis and DN OxyPark Apartment, Bhubaneswar, on the causes, symptoms and coping methods for anxiety, and consulted medical professionals and a VLCC institute on massage and menthol therapy before building and testing the device in the school's ATL lab.