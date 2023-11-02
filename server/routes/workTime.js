import express from 'express';
import { WorkTime } from '../models/WorkTime.js';

const router = express.Router();

// Route to create a new work time entry (arrival time)
router.post('/worktimes/arrival', async (req, res) => {
  try {
    const { name, arrival } = req.body;
    const workTime = new WorkTime({ name, arrival });
    await workTime.save();
    res.json({ message: 'Arrival time saved', id: workTime._id }); // Include the ID in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to create a new work time entry (departure time)
router.post('/worktimes/departure', async (req, res) => {
  try {
    const { name, departure } = req.body;

    const workTime = await WorkTime.findOne({ name });
    if (!workTime) {
      return res.status(404).json({ error: 'Work time not found' });
    }

    workTime.departure = departure;
    await workTime.save();

    res.json({ message: 'Departure time saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to fetch all work times (arrival and departure)
router.get('/worktimes', async (req, res) => {
  try {
    // Query your database to get all work times
    const workTimes = await WorkTime.find();
    res.json(workTimes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;









// import express from 'express';
// import { WorkTime } from '../models/WorkTime.js';

// const router = express.Router();

// // Route to create a new work time entry (arrival time)
// router.post('/worktimes/arrival', async (req, res) => {
//   try {
//     const { arrival } = req.body;
//     const workTime = new WorkTime({ arrival });
//     await workTime.save();
//     res.json({ message: 'Arrival time saved', id: workTime._id }); // Include the ID in the response
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to create a new work time entry (departure time)
// router.post('/worktimes/departure', async (req, res) => {
//   try {
//     const { arrivalId, departure } = req.body;

//     const workTime = await WorkTime.findById(arrivalId);
//     if (!workTime) {
//       return res.status(404).json({ error: 'Work time not found' });
//     }

//     workTime.departure = departure;
//     await workTime.save();

//     res.json({ message: 'Departure time saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch all work times (arrival and departure)
// router.get('/worktimes', async (req, res) => {
//   try {
//     // Query your database to get all work times
//     const workTimes = await WorkTime.find();
//     res.json(workTimes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default router;







// import express from 'express';
// import { WorkTime } from '../models/WorkTime.js';

// const router = express.Router();

// // Route to create a new work time entry (arrival time)
// router.post('/worktimes/arrival', async (req, res) => {
//   try {
//     const { arrival } = req.body;
//     const workTime = new WorkTime({ arrival });
//     await workTime.save();
//     res.json({ message: 'Arrival time saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to update the existing work time entry with departure time
// router.put('/worktimes/departure/:id', async (req, res) => {
//   try {
//     const { departure } = req.body;
//     const { id } = req.params;

//     const workTime = await WorkTime.findById(id);
//     if (!workTime) {
//       return res.status(404).json({ error: 'Work time not found' });
//     }

//     workTime.departure = departure;
//     await workTime.save();

//     res.json({ message: 'Departure time saved' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to fetch all work times (arrival and departure)
// router.get('/worktimes', async (req, res) => {
//   try {
//     // Query your database to get all work times
//     const workTimes = await WorkTime.find();
//     res.json(workTimes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default router;

