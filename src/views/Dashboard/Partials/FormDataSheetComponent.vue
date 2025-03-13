<script setup>
import InfoButton from '@/components/InfoButton.vue';


defineProps(['form'])
</script>


<template>
  <div class="event-details p-8 bg-gray-50 rounded-lg shadow-md">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ form.event_name }}</h1>
    <p class="text-gray-600 mb-6">{{ form.description }}</p>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Event Details</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Place:</strong> {{ form.place }}</li>
      <li><strong class="text-gray-700">Address:</strong> {{ form.address }}</li>
      <li><strong class="text-gray-700">Type:</strong> {{ form.eventType }}</li>
      <li><strong class="text-gray-700">Classification:</strong> {{ form.eventClassification }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Timing</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Start Date:</strong> {{ form.construction_start_date }} at {{ form.construction_start_time }}</li>
      <li><strong class="text-gray-700">End Date:</strong> {{ form.construction_end_date }} at {{ form.construction_end_time }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Specifics</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Participants:</strong> {{ form.participants }}</li>
      <li><strong class="text-gray-700">Press Public:</strong> {{ form.pressPublic }}</li>
      <li><strong class="text-gray-700">Nature:</strong> {{ form.nature }}</li>
      <li><strong class="text-gray-700">Program Plan:</strong> {{ form.programPlan }}</li>
      <li><strong class="text-gray-700">Venue Setup:</strong> {{ form.venueSetup }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Logistics</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Accommodation Needed:</strong> {{ form.accommodation_needed }}</li>
      <li><strong class="text-gray-700">Accommodation Count:</strong> {{ form.accommodation_count }}</li>
      <li><strong class="text-gray-700">Parking Needed:</strong> {{ form.parking_needed }}</li>
      <li><strong class="text-gray-700">Parking Details:</strong> {{ form.parking_details }}</li>
      <li><strong class="text-gray-700">Waste Generated:</strong> {{ form.waste_generated }}</li>
      <li><strong class="text-gray-700">Waste Disposal:</strong> {{ form.waste_disposal }}</li>
      <li><strong class="text-gray-700">Waste Handler:</strong> {{ form.waste_handler }}</li>
      <li><strong class="text-gray-700">Internet Needed:</strong> {{ form.internet_needed }}</li>
      <li><strong class="text-gray-700">Tech Support Needed:</strong> {{ form.tech_supportNeeded }}</li>
      <li><strong class="text-gray-700">Tech Equipment:</strong> {{ form.tech_equipment }}</li>
    </ul>

    <!-- <h2 class="text-2xl font-semibold text-gray-700 mb-4">Additional Requirements</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Limited Mobility:</strong> {{ form.limited_mobility }}</li>
      <li><strong class="text-gray-700">Photo/Video Recording:</strong> {{ form.photo_videoRecording }}</li>
      <li><strong class="text-gray-700">Recording Tools:</strong> {{ form.recording_tools }}</li>
      <li><strong class="text-gray-700">Catering Needed:</strong> {{ form.catering_needed }}</li>
      <li><strong class="text-gray-700">Catering Type:</strong> {{ form.catering_type.join(', ') }}</li>
      <li><strong class="text-gray-700">Construction Needed:</strong> {{ form.constructionNeeded }}</li>
      <li><strong class="text-gray-700">Construction Dates:</strong> {{ form.constructionDates.startDate }} to {{ form.constructionDates.endDate }}</li>
      <li><strong class="text-gray-700">Subcontractors:</strong> {{ form.subcontractors }}</li>
      <li><strong class="text-gray-700">High Altitude Work:</strong> {{ form.highAltitudeWork }}</li>
      <li><strong class="text-gray-700">Scaffolding Needed:</strong> {{ form.scaffoldingNeeded }}</li>
      <li><strong class="text-gray-700">Manual Material Handling:</strong> {{ form.manualMaterialHandling }}</li>
      <li><strong class="text-gray-700">Mechanical Material Handling:</strong> {{ form.mechanicalMaterialHandling }}</li>
      <li><strong class="text-gray-700">Mechanical Equipment:</strong> {{ form.mechanicalEquipment.join(', ') }}</li>
      <li><strong class="text-gray-700">Cleaning Before:</strong> {{ form.cleaningBefore }}</li>
      <li><strong class="text-gray-700">Cleaning During:</strong> {{ form.cleaningDuring }}</li>
      <li><strong class="text-gray-700">Electrical Needed:</strong> {{ form.electricalNeeded.join(', ') }}</li>
      <li><strong class="text-gray-700">Power Cabinet:</strong> {{ form.powerCabinet }}</li>
      <li><strong class="text-gray-700">Power Demand:</strong> {{ form.powerDemand }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Safety Compliance</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Fire Hazard:</strong> {{ form.safetyCompliance.fireHazard }}</li>
      <li><strong class="text-gray-700">Activities:</strong> {{ form.safetyCompliance.activities.join(', ') }}</li>
      <li><strong class="text-gray-700">Chemical Usage:</strong> {{ form.safetyCompliance.chemicalUsage }}</li>
      <li><strong class="text-gray-700">Decorations:</strong> {{ form.safetyCompliance.decorations }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Organizer Details</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Name:</strong> {{ form.organizerDetails.name }}</li>
      <li><strong class="text-gray-700">Phone:</strong> {{ form.organizerDetails.phone }}</li>
      <li><strong class="text-gray-700">Email:</strong> {{ form.organizerDetails.email }}</li>
      <li><strong class="text-gray-700">Address:</strong> {{ form.organizerDetails.address }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">Client Details</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Name:</strong> {{ form.clientDetails.name }}</li>
      <li><strong class="text-gray-700">Address:</strong> {{ form.clientDetails.address }}</li>
      <li><strong class="text-gray-700">Tax Number:</strong> {{ form.clientDetails.taxNumber }}</li>
      <li><strong class="text-gray-700">Phone:</strong> {{ form.clientDetails.phone }}</li>
      <li><strong class="text-gray-700">Email:</strong> {{ form.clientDetails.email }}</li>
    </ul>

    <h2 class="text-2xl font-semibold text-gray-700 mb-4">File Uploads</h2>
    <ul class="space-y-2 mb-6">
      <li><strong class="text-gray-700">Event Notification Form:</strong> {{ form.fileUploads.eventNotificationForm || 'Not uploaded' }}</li>
      <li><strong class="text-gray-700">Venue Layout:</strong> {{ form.fileUploads.venueLayout || 'Not uploaded' }}</li>
    </ul> -->

    <!-- <h2 class="text-2xl font-semibold text-gray-700 mb-4">Agreements</h2>
    <ul class="space-y-2">
      <li><strong class="text-gray-700">Data Protection:</strong> {{ form.agreements.dataProtection ? 'Agreed' : 'Not agreed' }}</li>
      <li><strong class="text-gray-700">Event Regulations:</strong> {{ form.agreements.eventRegulations ? 'Agreed' : 'Not agreed' }}</li>
    </ul> -->
  </div>


    



    <div>
        <slot name="backButton"/>

        <div>
            <InfoButton></InfoButton>
        </div>
    </div>

</template>